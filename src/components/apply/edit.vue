<template>
    <div id="edit" class="clearfix">
      <section>
        <div class="edit-main clearfix">
          <textarea name="" id="text" v-model="textValue" :placeholder="placeholderValue"></textarea>
          <div>
            <span class="number">{{textValue.length}}/500</span>
          </div>
        </div>
        <div class="picMain clearfix">
          <ul class="clearfix">
            <li v-for="(item,index) of myImgs" :key="index">
              <img :src="item" alt="图片" title="图片">
              <div class="close" @click="deleteImage(index)">
                x
              </div>
            </li>
            <li>

              <!--accept="image/gif,image/jpeg,image/jpg,image/png"-->
              <!--<van-uploader :after-read="onRead" multiple v-if="!(myImgs.length>=9)">-->
              <!--<van-uploader>-->
                <!--<input id="file" type="file" @change="test($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style="position: absolute;left: 0;top: 0rem;width: 2rem;height: 2rem;" />-->
                <div class="ios" v-if="isIos">
                  <input id="file" ref="inputer" type="file" @change="test1($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style="position: absolute;left: 0;top: 0rem;width: 2rem;height: 2rem;" />
                  <img src="@/assets/images/sugAdd.png" alt="添加图片" title="添加图片" class="addPic">
                </div>
              <div class="android" v-if="!isIos">
                <van-uploader :after-read="onRead"  accept="image/gif,image/jpeg,image/jpg,image/png" v-if="!(myImgs.length>=9)">
                  <img src="@/assets/images/sugAdd.png" alt="添加图片" title="添加图片" class="addPic">
                </van-uploader>
              </div>
              <!--</van-uploader>-->
            </li>
          </ul>
        </div>
      </section>
      <footer class="issues">
        <div class="publish" @click="isClick && publish()">发布</div>
        <div class="cancel" @click="cancel">取消</div>
      </footer>
      <van-loading  color="white" id="loading" v-if="loadShow"/>
    </div>
</template>

<script>
  import { Toast,Dialog } from 'vant';
  import EXIF from 'exif-js'
    export default {
      name: "edit",
      data(){
        return{
          loadShow: false,
          myImgs:[],
          textValue:'',
          placeholderValue:'说点什么好吧...',
          isClick:true,
          isIos:true
        }
      },
      watch:{
        // 如果路由有变化，会再次执行该方法
        '$route': 'getData',
        'textValue': 'confineLength',
      },
      mounted(){
        this.getData();
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

        imgPreview (file) {   //base64 格式
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
                self.myImgs.push(self.base64 )
              }
            };
          }
        },
        test(e) {
          // let base=e.target.files[0].base64;
          // console.log(rst.base);
          lrz(e.target.files[0])
            .then( (rst)=> {
              // 处理成功会执行
              // alert(rst.base64);
              this.myImgs.push(rst.base64);
              // console.log(this.myImgs);
            })
            .catch(function (err) {
              // 处理失败会执行
            })
            .always(function () {
              // 不管是成功失败，都会执行
            });

        },
        onRead(file){
          // console.log(file.content);
          this.myImgs.push(file.content);
          var data = new FormData()
          data.append('file', file.file);
          console.log(file);
          /*if (this.textValue != '') {
            this.axios.post('dynamic.php',{
              type: 'dynamic',
              token: 'c6187f4d45daabad829dabf49f167502',
              back_type:'dynamic',
              category: 'publish',
              images:this.myImgs,
              detail: this.textValue,
              staff_id: 1,
              company_id: 1
            }).then(res=>{
              console.log(res.data);
              // Toast('发布成功');
              // this.$toast.clear();
              // this.$router.go(-1);
            }).catch(fail=>{
              Toast('发布失败');
              // console.log(fail,'失败')
            });
          }*/
        },
        getData(){
          // replace getPost with your data fetching util / API wrapper
          if(this.$route.query.picDatas){
            this.loadShow = false
            this.myImgs.push([this.$route.query.picDatas])
            this.$route.query.picDatas = '';
          }else{
              // this.loadShow = true
          }

        },
        deleteImage(index) {
          this.myImgs.splice(index,1)
        },
        publish(){
          if(this.myImgs.length==0){
            Dialog.alert({
              message: '必须上传一张图片哦'
            }).then(() => {
            });
          }else if (this.textValue == '') {
            this.$toast('内容不能为空')
          } else {
            this.$toast.loading({
              mask: true,
              message: '加载中...'
            });
            this.isClick = false;
            setTimeout(()=>{
              this.$toast.clear();
              Toast('发布成功');
              this.$router.go(-1);
            },1000)
            this.axios.post('dynamic.php', {
              type: 'dynamic',
              token: 'c6187f4d45daabad829dabf49f167502',
              back_type: 'dynamic',
              category: 'publish',
              images: this.myImgs,
              detail: this.textValue,
              staff_id: 1,
              company_id: 1
            }).then(res => {
              Toast('发布成功');
              // this.$toast.clear();
              this.$router.go(-1);
            }).catch(fail => {
              Toast('发布失败');
              console.log(fail, '失败')
            });
          }

        },
        confineLength(){
          (this.textValue.length>500) ? this.textValue = this.textValue.slice(0, 500):'';
        },
        cancel(){
          Dialog.confirm({
            title: '退出',
            message: '确认退出吗?'
          }).then(() => {
           this.$router.go(-1);
          }).catch(() => {
            // on cancel
          });
        }
      }
    }

</script>

<style scoped lang="scss">
  $font-42: .42rem;
  $font-30: .32rem;
  $font-52: .52rem;
  $imgSize: 2.3rem;
  $color-hui: rgb(176,176,176);
  $color-rad: rgb(160,160,165);
  $line: rgb(229,229,229);
  div.van-dialog__message--has-title{
    text-align: center!important;
  }
  @mixin line{
    width: 100%;
    height: 1px;
    background: #e5e5e5;
  }
  #edit{
    position: relative;
    padding: .4rem .45rem .45rem;
    border-bottom: 1px solid rgb(229,229,229);
    div.edit-main{
      #text{
        font-size: $font-42;
        border: none;
        width: 100%;
        height: 2.2rem;
      }
      span.number{
        display: block;
        font-size: $font-30;
        color: $color-hui;
        text-align: right;
      }

    }
    div.picMain{
      margin-top: .35rem;
      ul{
        li{
          float: left;
          width: 22%;
          margin-right: .25rem;
          position: relative;
          img{
            width: 2.2rem;
            height: 2.2rem;
          }
          div.close{
            /*z-index: 999;*/
            position: absolute;
            right: -.25rem;
            top: -.25rem;
            width: .5rem;
            line-height: .5rem;
            text-align: center;
            font-size: .3rem;
            color: #ffffff;
            background: $color-rad;
            border-radius: 50%;
          }
        }
        li:nth-of-type(5),li:nth-of-type(6),li:nth-of-type(7),li:nth-of-type(8),li:nth-of-type(9){
          margin-top: .33rem;
        }
      }
      img.addPic{
        width: 2.36rem;
        height: 2.36rem;
      }
    }
    footer.issues{
      /*z-index: 99999;*/
      position: fixed;
      left: 0;
      width: 100%;
      bottom: 0;
      font-size: $font-52;
      text-align: center;
      div.publish{
        padding: .3rem 0;
        border-top: 1px solid $line;
        border-bottom: 1px solid $line;
      }
      div.cancel{
        margin-top: .25rem;
        @extend div.publish;
      }
    }
    #loading{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background: rgba(125,125,125,.5);
      width: 2.5rem;
      height: 2.5rem;
    }
  }
</style>
