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
              <van-uploader :after-read="onRead"  accept="image/gif,image/jpeg,image/jpg,image/png" v-if="!(myImgs.length>=9)">
                <img src="@/assets/images/sugAdd.png" alt="添加图片" title="添加图片" class="addPic">
              </van-uploader>
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
    export default {
      name: "edit",
      data(){
        return{
          loadShow: false,
          myImgs:[],
          textValue:'',
          placeholderValue:'说点什么好吧...',
          isClick:true
        }
      },
      watch:{
        // 如果路由有变化，会再次执行该方法
        '$route': 'getData',
        'textValue': 'confineLength',
      },
      mounted(){
        this.getData();
      },
      methods:{
        onRead(file){
          this.myImgs.push(file.content);
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
          }else{
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
              console.log(res,'成功')
              console.log(res);
              Toast('发布成功');
              this.$router.go(-1);
            }).catch(fail=>{
              Toast('发布失败');
              console.log(fail,'失败')
            });
            this.isClick=false;
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
            z-index: 999;
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
      z-index: 99999;
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
