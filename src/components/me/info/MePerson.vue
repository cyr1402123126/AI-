<template>
  <div id="introduce">
    <!--更改頭像-->
    <div class="myPic clearfix" style="margin-bottom: .4rem">
      <div class="titleBar clearfix">
        <div class="tiTle">更改头像</div>
      </div>
      <span class="addMain">
        <ul>
          <li v-for="(item,index) in myTitleImage" :key="index" v-show="myImageShow">
            <img :src="item" alt="" class="addPic" @click="alertImage([item],0)">
            <img src="@/assets/images/me_close.png" alt="" @click="deleteMyImage(index)">
          </li>
          <li class="ios" style="width: 2.9rem;margin-top: .5rem;" v-show="!myImageShow" v-if="isIos">
            <input id="file" ref="inputer" type="file" @change="test1($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style="opacity:0;position: absolute;left: 0;top: 0rem;width: 2.8rem;height: 2.8rem;" />
            <img src="@/assets/images/addPic.png" alt="" class="addPic">
          </li>
          <li class="android" style="width: 2.9rem;margin-top: 0;" v-show="!myImageShow" v-if="!isIos">
            <van-uploader accept="image/gif,image/jpeg,image/jpg,image/png" :after-read="onMyRead">
              <van-icon/>
              <img src="@/assets/images/addPic.png" alt="" class="addPic">
            </van-uploader>
          </li>
        </ul>
      </span>
    </div>
    <!--个人简介-->
    <div class="meIntroduce">
      我的个人简介
    </div>
    <!--个人介绍-->
    <div class="welecome">
      <form action="">
        <textarea v-autosize v-model="textarea" style="resize:none;" type="text" name="wecomeText"  :placeholder='autoIntro' cols="5"></textarea>
      </form>
    </div>
    <!--我的音乐-->
    <!--<div class="myMusic">
      我的声音
    </div>-->
    <!--<img src="@/assets/images/person_vedio.png" alt="">-->
    <!--我的标签-->
    <div class="myTag">
      <div class="mainTop clearfix">
        <div class="tiTle">我的标签</div>
        <div class="tagNumber">{{ myTag.length }}/10</div>
      </div>
      <section class="main clearfix">
          <span class="tag" v-for="(item,index) in myTag" :key="index">
            {{item}}
            <img class="close" src="@/assets/images/me_close.png" alt="" @click="deleteTag(index)">
          </span>
      </section>
      <div class="addTag">
        <img @click="addTag" src="@/assets/images/addTag.png" alt="添加标签" title='添加印象标签'>
      </div>
    </div>
    <!--可参考标签-->
    <div class="consultTag">
      <div class="title">可参考标签</div>
      <span class="cTag" v-for="(item,index) of consultTag" :key="index" @click="pushTag($event)">
          {{item}}
      </span>
    </div>
    <!--我的照片-->
    <div class="myPic clearfix">
      <div class="titleBar clearfix">
        <div class="tiTle">我的照片</div>
        <div class="tagNumber">{{ myImages.length }}/9</div>
      </div>
      <span class="addMain">
        <ul>
          <li v-for="(item,index) in myImages" :key="index">
            <img :src="item" alt="" class="addPic" @click="alertImage(myImages,index)">
            <img src="@/assets/images/me_close.png" alt="" @click="deleteImage(index)">
          </li>
          <li style="width: 2.9rem;margin-top: 0;">
            <van-uploader accept="image/gif,image/jpeg,image/jpg,image/png" :after-read="onRead">
              <van-icon/>
              <img src="@/assets/images/addPic.png" alt="" class="addPic">
            </van-uploader>
          </li>
        </ul>
      </span>
    </div>
    <!--保存-->
    <div class="save">
      <div class="text" @click="save">保存</div>
    </div>

    <!--弹出标签框-->
    <van-dialog
      v-model="show"
      :title="label"
      show-cancel-button
      :lockScroll='lock'
      :before-close="beforeClose"
      @confirm="confirm"
      class="alertDialog"
    >
      <van-field
        v-model="username"
        placeholder="输入自定义标签"
      />
    </van-dialog>
  </div>
</template>

<script>
  import { Dialog,Toast,ImagePreview } from 'vant';
  import EXIF from 'exif-js'
  export default {
    data(){
      return {
        autoIntro: "",
        myTag:[],
        consultTag:['诚信至上','豪爽耿直','广交朋友','原则性强','互联网创业者','有俩把刷子','温暖的小太阳','小奶猫'],
        // myImages:[require("@/assets/images/test.png"),require("@/assets/images/test.png"),require("@/assets/images/test.png"),],
        myImages:[],
        username:'',
        show:false,
        label:'添加标签',
        lock:false,
        textarea:'',
        myImageShow:false,
        myTitleImage:[],
        isIos:true
      }
    },
    name: "MePerson",
    created() {
      this.$store.commit('getActive',4)
      this.axios.get('synopsis.php?type=brief&token=39c9b3340883c3b37bb7c9b21d45e44a')
      // this.axios.get('mePerson')
        .then(res=>{
          let data=res.data;
          this.textarea=data.autoIntro;
          this.myTag=data.myTag;
          // this.consultTag=data.consultTag;
          this.myImages=data.myImages;
          this.myTitleImage=data.cover;
          console.log(data);
          this.myImageShow=this.myTitleImage.length >0 && this.myTitleImage != null?true:false;
        })
    },
    mounted() {
      var u = navigator.userAgent;
      // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      /*alert('是否是Android：'+isAndroid);
      alert('是否是iOS：'+isiOS);*/
      if (isiOS) {
        this.isIos=true;
      }else {
        this.isIos=false;
      }
    },
    methods:{
      test1(e) {
        let that=this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        for(let i in inputDOM.files){
          this.file= inputDOM.files[i];
          this.imgPreview(this.file);
          EXIF.getData(this.file, function() {
            that.Orientation = EXIF.getTag(this, 'Orientation');
          });
        }
      },
      alertImage(img,index) {
        console.log(img);
        ImagePreview({
          images: img,
          showIndex: false,
          startPosition:index
        });
      },
      imgPreview (file) {
        //base64 格式
        this.imgType=1;
        this.img_loading=true;
        let self = this;
        let imgContent={};
        imgContent.name=file.name;
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          var reader = new FileReader();
          // 将图片将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let IMG = new Image();
            IMG.src = this.result;
            IMG.onload = function(){
              let w = this.naturalWidth,
                h = this.naturalHeight,
                resizeW = 0,
                resizeH = 0;
              //压缩设置
              let maxSize = {
                width:1280,      //图片最大宽度
                height:1280,     //图片最大高度
                level:0.6       //图片保存质量
              };
              //计算缩放比例
              if(w > maxSize.width || h > maxSize.height){
                let multiple = Math.max(w / maxSize.width , h / maxSize.height);
                resizeW = w / multiple;
                resizeH = h / multiple;
              }else{
                resizeW = w;
                resizeH = h;
              }
              let canvas = document.createElement("canvas"),
                cxt = canvas.getContext('2d');
              //根据拍摄的角度进行图片旋转调整
              if (self.Orientation == 3) {
                canvas.width = resizeW;
                canvas.height = resizeH;
                cxt.rotate(Math.PI);
                cxt.drawImage(IMG, 0, 0, -resizeW, -resizeH)
              } else if (self.Orientation == 8) {
                canvas.width = resizeH;
                canvas.height = resizeW;
                cxt.rotate(Math.PI * 3 / 2);
                cxt.drawImage(IMG, 0, 0, -resizeW, resizeH)
              } else if (self.Orientation == 6) {
                canvas.width = resizeH;
                canvas.height = resizeW;
                cxt.rotate(Math.PI / 2);
                cxt.drawImage(IMG, 0, 0, resizeW, -resizeH)
              } else {
                canvas.width = resizeW;
                canvas.height = resizeH;
                cxt.drawImage(IMG, 0, 0, resizeW, resizeH)
              }
              //base64,最终输出的压缩文件
              self.base64 = canvas.toDataURL('image/jpeg',maxSize.level);
              self.num+=1;
              self.imgType=0;
              self.img_loading=false;
              self.myImageShow=true;
              self.myTitleImage.push(self.base64)
            }
          };
        }
      },
      onRead(file) {
        if (this.myImages.length==9) {
          Dialog.alert({
            title: '',
            message: '图片数量不能超过九张'
          }).then(() => {
            // on close
          });
        }else {
          console.log(file);
          this.myImages.push(file.content)
        }
      },
      onMyRead(file) {
        // console.log(this.myTitleImage)
        this.myImageShow=true;
        this.myTitleImage.push(file.content)
        // alert(this.myTitleImage)
      },
      deleteTag(index) {
        this.myTag.splice(index,1)
      },
      deleteMyImage(index) {
        this.$dialog.confirm({
          title: '',
          message: '你确定要删除吗?'
        }).then(() => {
          this.myTitleImage.splice(index,1)
          this.myImageShow=false;
          // on confirm
        }).catch(() => {
          // on cancel
        });
      },
      addTag() {
        this.username='';
        this.show=true;
      },
      pushTag(e) {
        if (this.myTag.length < 10) {
          this.myTag.push(e.target.innerText);
        }else {
          this.$toast('不能超过10个标签')
        }
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      done() {
        this.myTag.push(this.username)
        this.show=false;
      },
      confirm() {
        if (this.myTag.length<10) {
          this.myTag.push(this.username);
        }else {
          this.$toast('不能超过10个标签')
        }
        this.show=false;
      },
      save() {
        let company_id=this.getCookie('company_id');
        let staff_id=this.getCookie('staff_id');
        let data={
          id:0,
          company_id:company_id,
          staff_id:staff_id,
          textarea:this.textarea,
          myTag:this.myTag,
          myImages:this.myImages,
          cover:this.myTitleImage
        };
        this.axios.post('synopsis.php?type=synopsis&token=fbf2bd46c700b4d98b2c4b3633b40844',data)
          .then(res=>{
            Toast('保存成功');
            this.$router.push('/me/list')
        })
      },
      deleteImage(index) {
        this.$dialog.confirm({
          title: '',
          message: '你确定要删除吗?'
        }).then(() => {
          this.myImages.splice(index,1)

        }).catch(() => {

        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  $font-46: .46rem;
  $color-9: #9999;
  $font-38: .38rem;
  $color-qBlue: #e2ecf8;
  $color-qYellow: #fdf7eb;
  $color-qlv: #ecffec;
  $color-sBlue: #1d7ae8;
  $color-666: #6666;
  $color-sH: #fdbb41;
  $color-sLv: #48cba6;
  $rgb-125: rgb(125,125,125);
  .van-cell {
    width: 85%;
    border: 1px solid #d6d6d6;
    margin: 0 auto;
  }
  .van-dialog .van-dialog__header {
    margin-bottom: .3rem;
  }
  #introduce{
    padding: .4rem .5rem 0;
    margin-bottom: 2.6rem!important;
    .meIntroduce{
      padding: .26rem 0 .3rem 0;
      font-size: $font-46;
    }
    .welecome{
      font-size: .38rem;
      color: #888888;
      textarea{
        -webkit-input-placeholder {
          color: #8888;
          font-size: .38rem;
        }
        -moz-placeholder {
          color: #8888;
          font-size: .38rem;
        }
        -ms-placeholder {
          color: #8888;
          font-size: .38rem;
        }
        -moz-placeholder {
          color: #8888;
          font-size: .38rem;
        }
        overflow:hidden;
        width: 100%;
        height: 2.2rem;
        border:0;
        text-indent: 20px;
        text-align: justify;
      }
    }
    .myMusic{
      padding-top: .4rem;
    }
    div.myMusic{
      padding-top: .4rem;
    }
    div.myTag{
      margin-top: .8rem;
      div.tiTle{
        float: left;
        font-size: $font-46;
      }
      div.tagNumber{
        float: right;
        font-size: .38rem;
        color: #888;
      }
      section.main{
        margin: .25rem 0 .5rem 0;
        .tag{
          display: inline-block;
          position: relative;
          margin-top: .3rem;
          margin-right: .35rem;
          padding: .3rem .45rem .3rem .8rem;
          background: $color-qBlue;
          color: $color-sBlue;
          border-radius: 5px;
          .close{
            position: absolute;
            right: -.2rem;
            top: -.2rem;
            width: .42rem;
            height: .42rem;
            line-height: .32rem;
            text-align: center;
            color: #ffffff;
            border-radius: 50%;
          }
        }
      }
      div.addTag{
        width: 2.4rem;
        height: 1.08rem;
      }
    }
    div.consultTag{
      margin: .8rem 0;
      div.title{
        font-size: $font-46;
      }
      span.cTag{
        display: inline-block;
        position: relative;
        margin-top: .3rem;
        margin-right: .35rem;
        padding: .3rem .45rem .3rem .8rem;
        background: #f6f6f6;
        color: $rgb-125;
        border-radius: 5px;
        span.close{
          position: absolute;
          right: -.15rem;
          top: -.15rem;
          width: .42rem;
          height: .42rem;
          line-height: .32rem;
          background: rgb(102,102,102);
          text-align: center;
          color: #ffffff;
          border-radius: 50%;
        }
      }
      span.cTag.alery{
        color: #bab9b9;
      }
    }
    div.myPic{
      div.titleBar{
        margin-top: .44rem;
        div.tiTle{
          float: left;
          font-size: $font-46;
        }
        div.tagNumber{
          float: right;
          font-size: .38rem;
          color: #888;
        }
      }
      .addMain {
        ul {
          width: 100%;
          li {
            float: left;
            margin-right: .5rem;
            margin-top: .5rem;
            position: relative;
            z-index: 1;
            img:not(.addPic) {
              width: .45rem;
              height: .45rem;
              position: absolute;
              right: -.2rem;
              top: -.2rem;
              z-index: 2;
            }
            img.addPic{
              width: 2.92rem;
              height: 2.92rem;
            }
          }
          li:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
  }
  div.save{
    z-index: 99999;
    position: fixed;
    left: 0;
    bottom: 0rem;
    width: 100%;
    height: 2rem;
    background: #fff;
    box-shadow: 0px -2px 5px rgba(0,0,0,.04);
    div.text{
      margin: .3rem auto;
      width: 9.8rem;
      line-height: 1.3rem;
      text-align: center;
      color: #ffffff;
      background: #3b83ff;
      text-align: center;
      border-radius: .15rem;
    }
  }


</style>
