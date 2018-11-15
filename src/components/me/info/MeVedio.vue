<template>
  <div>
    <div v-show="show">
      <div class="video">
        <p>我的视频</p>
        <div class="upload" v-show="flag">
          <img src="@/assets/images/me_video.png" alt="">
          <!--<input id="fileId" type="file" multiple="multiple" name="file" @change="update($event)" />-->
          <file-base64
            v-bind:multiple="true"
            v-bind:done="getFiles">
          </file-base64>
        </div>
        <div class="success" v-show="!flag">
          <video ref="play" :src="video" controls="controls">
            对不起，你的浏览器版本过低，请更换浏览器
          </video>
          <img v-show="play" class="selectImg" :src="test" alt="">
          <img v-show="play" src="@/assets/images/play.png" alt="" class="play" @click="autoplay">
          <img src="@/assets/images/me_close.png" alt="" @click="close">
        </div>
      </div>
      <div class="clearfix">
        <button @click="startCrop" class="startCrop">上传视频封面</button>
        <button @click="deleteCrop" class="deleteCrop">删除封面</button>
      </div>
      <input type="button" value="保存" @click="save">
    </div>
    <div class="background" v-show="showBackground">
      <div class="border"></div>
      <div class="size">尺寸 : 347 × 181</div>
      <div class="upload">
        <button>选择图片</button>
        <file-base64
          v-bind:multiple="true"
          v-bind:done="getPicture">
        </file-base64>
      </div>
    </div>
    <div class="cropper" v-show="showSelect">
      <vueCropper
        ref="cropper"
        :img="example3.img"
        :autoCrop="example3.autoCrop"
        :autoCropWidth="example3.autoCropWidth"
        :autoCropHeight="example3.autoCropHeight"
        :fixedBox="example3.fixedBox"
      ></vueCropper>
      <button class="select" @click="getPicture">选择图片</button>
      <file-base64
        v-bind:multiple="true"
        v-bind:done="getPicture">
      </file-base64>
      <button class="sure" @click="finish">确定</button>
      <!--<input type="button" value="上传" style="position: fixed;bottom: 0;left: 0;" @click="finish()">-->
    </div>
  </div>
</template>

<script>
  import fileBase64 from '@/components/template/vue-file-base64';
  import { VueCropper }  from 'vue-cropper'
  export default {
    name: "MeVedio",
    data() {
      return {
        flag:true,
        // video: require('@/assets/video/test.mp4'),
        video: '',
        videoPath:'',
        show: true,
        showBackground:false,
        showSelect:false,
        play:false,
        test:'',

        example3: {
          img: require("@/assets/images/test.png"),
          autoCrop: true,
          autoCropWidth: 347,
          autoCropHeight: 181,
          fixedBox: true
        }
      }
    },
    components: {
      fileBase64,
      VueCropper
    },
    created() {
      this.$store.commit('getActive',4)
      this.axios.get('https://mp.wedotop.com/Api/synopsis.php?type=video&token=09b766ba978f601b475b86142c4ab841&get_video=1')
        .then(res => {
          console.log(res.data);
          this.flag = res.data.path == '' ? true : false;
          this.video = res.data.path;
        })
    },
    methods:{
      getPicture(files) {
        console.log(files);
        this.show = false;
        this.showBackground = false;
        this.showSelect = true;
        this.example3.img = files[0].base64;
      },
      /*startCrop () {
        // start
        this.crap = true
        this.$refs.cropper.startCrop()
      },
      realTime (data) {
        // this.previews = data
      },*/
      startCrop() {
        this.show = false;
        this.showBackground = true;
        this.showSelect = false;
      },
      finish() {
        /*this.$refs.cropper.getCropData((data) => {
          console.log(data);
          this.test = data;
          this.show = !this.show;
          // test.location.href = data
        })*/
        this.play = true;
        this.show = true;
        this.showBackground = false;
        this.showSelect = false;
        this.$refs.cropper.getCropBlob((data) => {
          let downImg = window.URL.createObjectURL(data);
          this.test = downImg;
          console.log(downImg);
        })

        /*if (window.navigator.msSaveBlob) {
          var blobObject = new Blob([data]);
          window.navigator.msSaveBlob(blobObject, 'demo.png');
        } else {
          this.$nextTick(()=>{
            this.$refs.downloadDom.click();
          })
        }*/
      },
      autoplay() {
        this.play = false;
        this.$refs.play.play();
      },
      deleteCrop() {
        this.play = false;
      },


      getFiles(files){
        var reg = /[.](3gpp|mp2|mp3|mp4|mpeg|mpg|MP4)$/.test(files[0].name);
        if (parseInt(files[0].size) < 10000) {
          this.$toast.loading({
            mask: true,
            message: '上传中...',
            duration: 0,
          });
          setTimeout(() => {
            this.video = files[0].base64;
            this.flag = !this.flag;
            this.$toast.clear();
          },3000)
        }else {
          this.$toast('上传的视频不能超过10M,请重选')
        }
        if (reg) {
          this.axios.post('synopsis.php?type=video&token=09b766ba978f601b475b86142c4ab841',{
            upload_video: files[0]
          }).then(res => {
            this.videoPath = res.data.path;
          })
        }else {
          this.flag = true;
          this.$toast('你选择的格式错误,请重选');
        }
        // console.log(reg);
        /*if (files[0].type == 'application/x-zip-compressed') {
          alert(1)
        }*/
      },
      update(e) {
        // var file=e.target.files;
        // var formData = new FormData();
        // formData.append(file.name, file);
        // console.log(formData);
        console.log(e.target.files);
        console.log(this.$refs.play);
        this.flag=false
      },
      close() {
        this.$dialog.confirm({
          title: '',
          message: '你确定要删除吗?'
        }).then(() => {
          this.flag=true;
        }).catch(() => {

        });

      },
      save() {
        this.axios.post('synopsis.php?type=video&token=09b766ba978f601b475b86142c4ab841',{
          video: this.videoPath
        }).then(res => {
          console.log(res.data);
          this.$router.go(-1);
        })
      }
    },
  }
</script>

<style>
  .van-dialog {
    top: 63%!important;
  }
  .vue-cropper {
    height: 10rem!important;
    background-image:none!important;
    background: #000!important;
    position: fixed!important;
    height: 20rem!important;
  }
</style>
<style scoped lang="scss">
  .video {
    padding: .4rem .4rem;
    p {
      margin: .3rem 0;
    }
    video {
      width: 10rem;
      height: 6.2rem;
      overflow: hidden;
      object-fit: scale-down;
      background: #000;
    }
    .upload {
      position: relative;
      img {
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 0;*/
        /*height: 5rem;*/
        height: 5.5rem;
        width: 100%;
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 5rem;
        opacity: 0;
      }
    }
    .success {
      position: relative;
      .selectImg {
        width: 10rem;
        height: 5.22rem;
        position: absolute;
        left: 0;
        top: 0;
      }
      .play {
        width: 1.45rem;
        height: 1.45rem;
        position: absolute;
        left: 43%;
        top: 33%;
        /*top: 51%;*/
        box-shadow: 1px 1px 1px #efefef;
        border-radius: 50%;
      }
      img {
        position: absolute;
        right: -.25rem;
        top: -.25rem;
        width: .6rem;
        z-index: 5;
      }
    }
  }
  .startCrop,.deleteCrop {
    font-size: .35rem;
    padding: .2rem .35rem;
    color: #9d9d9d;
    background: #f9f9f9;
    border: 1px solid #cdcdcd;
  }
  .startCrop {
    float: left;
    margin-left: .4rem;
  }
  .deleteCrop {
    float: right;
    margin-right: .4rem;
  }
  input[type=button] {
    width: 100%;
    height: 1.5rem;
    background: #3b83ff;
    text-align: center;
    color: #fff;
    position: fixed;
    bottom: 0;
    font-size: .48rem;
    z-index: 1000;
  }
  .cropper {
    .select,.sure,input[type=file] {
      position: fixed;
      bottom: 1.55rem;
      left: 15%;
      width: 2.7rem;
      border: 1px solid #fff;
      font-size: .4rem;
      padding: .25rem 0rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #fff;
      background: none;
      border-radius: .15rem;
    }
    input[type=file] {
      opacity: 0;
    }
    .sure {
      left: auto;
      right: 15%;
      background: #3e84ff;
      border: 1px solid #3e84ff;
    }
  }
  .background {
    background: #000;
    width: 100%;
    height: 100%;
    position: fixed;
    .border {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 10rem;
      height: 5.22rem;
      margin:auto;
      border: 1px solid #fff;
    }
    .size {
      font-size: .6rem;
      color: #fd0207;
      position: absolute;
      top: 65%;
      width: 100%;
      text-align: center;
      height: 50px;
    }
    .upload {
      button,input[type=file] {
        position: fixed;
        bottom: .35rem;
        border-radius: .15rem;
        /*display: inline-block;*/
        left: 0;
        right: 0;
        width: 2.7rem;
        margin: 0 auto;
        border:1px solid #fff;
        font-size: .4rem;
        padding: .25rem 0rem;
        box-sizing: border-box;
        color: #fff;
        background: none;
      }
      input[type=file] {
        width: 2.5rem;
        height: 1rem;
        opacity: 0;
      }
    }
  }

</style>
