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
          <img v-show="play" class="selectImg" :src="backgroundImage" alt="">
          <div class="play" v-show="play">
            <img src="@/assets/images/play.png" alt="" class="show-play" @click="autoplay">
          </div>
          <img src="@/assets/images/me_close.png" alt="" @click="close">
        </div>
      </div>
      <div class="clearfix">
        <button v-show="uploadPage" @click="startCrop" class="startCrop">上传视频封面</button>
        <button v-show="deletePage" @click="deleteCrop" class="deleteCrop">删除封面</button>
      </div>
      <input type="button" value="保存" @click="save">
    </div>
    <div class="background" v-show="showBackground">
      <div class="border">
        <img :src="backgroundImage" alt="">
      </div>
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
        :canMoveBox="example3.canMoveBox"
        :mixImgSize="example3.mixImgSize"
        :centerBox="example3.centerBox"
      ></vueCropper>
      <div class="bottom-color">
        <button class="select" @click="getPicture">选择图片</button>
        <file-base64
          v-bind:multiple="true"
          v-bind:done="getPicture">
        </file-base64>
        <button class="sure" @click="finish">确定</button>
      </div>
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
        // videoPath:'',
        show: true,
        showBackground:false,
        showSelect:false,
        play:false,
        backgroundImage:'',
        hasSelect: '',
        uploadPage:false,
        deletePage:false,
        saveImage: '',
        saveVideo: '',

        example3: {
          img: require("@/assets/images/test.png"),
          autoCrop: true,
          autoCropWidth: 347,
          autoCropHeight: 181,
          fixedBox: true,
          canMoveBox: false,
          centerBox: true,
          mixImgSize: 347
        }
      }
    },
    components: {
      fileBase64,
      VueCropper
    },
    created() {
      this.showPage();
      this.$store.commit('getActive',4);
      this.axios.get('synopsis.php?type=video&token=09b766ba978f601b475b86142c4ab841&get_video=1')
        .then(res => {
          console.log(res.data);
          let data = res.data;
          this.saveVideo = data.video;
          this.saveImage = data.video_cover;
          this.video = data.video_path;
          this.backgroundImage = data.video_cover_path;
          // this.videoPath = data.video_path;
          this.flag = data.video_path == '' ? true : false;
          this.play = this.backgroundImage ? true :false;
          // this.flag = this.backgroundImage ||  this.video ? false :true;
          this.showPage();
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
        this.play = true;
        this.show = true;
        this.showBackground = false;
        this.showSelect = false;
        /*this.$refs.cropper.getCropBlob((data) => {
          let downImg = window.URL.createObjectURL(data);
          this.backgroundImage = downImg;
          this.showPage();
          console.log(downImg);
        })*/
        this.$refs.cropper.getCropData((data) => {
          this.backgroundImage = data;
          this.showPage();
          this.axios.post('synopsis.php?type=video&token=09b766ba978f601b475b86142c4ab841',{
            video_cover: this.backgroundImage
          }).then(res => {
            this.saveImage = res.data.path;

            console.log(res.data.path);
            // this.backgroundImage = res.data.path;
          })
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
        this.$dialog.confirm({
          title: '',
          message: '你确定要删除吗?'
        }).then(() => {
          this.saveImage = '';
          this.backgroundImage = '';
          this.play = false;
          this.showPage();
        }).catch(() => {
        });
      },


      getFiles(files){
        var reg = /[.](3gpp|mp2|mp3|mp4|mpeg|mpg|MP4|3GP|3GPP|RM|RMVB|AVI|WMV|MOV)$/.test(files[0].name);
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
            this.showPage();
          },2000)
        }else {
          this.$toast('上传的视频不能超过10M,请重选')
        }
        if (reg) {
          this.axios.post('synopsis.php?type=video&token=09b766ba978f601b475b86142c4ab841',{
            upload_video: files[0],
          }).then(res => {
            this.saveVideo = res.data.path;
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
          this.saveImage = '';
          this.saveVideo = '';
          this.video = '';
          this.backgroundImage = '';
          this.showPage();
        }).catch(() => {

        });

      },
      save() {
        console.log(this.saveVideo);
        this.axios.post('synopsis.php?type=video&token=09b766ba978f601b475b86142c4ab841',{
          video: this.saveVideo,
          video_cover: this.saveImage
        }).then(res => {
          console.log(res.data);
          this.$toast('保存成功')
          this.$router.go(-1);
        })
      },
      showPage() {
        this.uploadPage = this.video ? true : false;
        this.deletePage = this.backgroundImage ? true :false;
      }
    },
  }
</script>

<style>
  .van-dialog {
    top: 53%!important;
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
        /*width: 1.45rem;
        height: 1.45rem;*/
        width: .6rem;
        padding: .4rem .4rem .4rem .4rem;
        position: absolute;
        left: 43%;
        top: 33%;
        /*top: 51%;*/
        background: rgba(0,0,0,.8);
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        border-radius: 50%;
        .show-play {
          margin-left: .05rem;
        }
      }
      img:not(.show-play):not(.selectImg) {
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
      bottom: .35rem;
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
    .bottom-color {
      width: 100%;
      background: rgba(0,0,0,.5);
      position: fixed;
      bottom: 0;
      height: 1.8rem;
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
