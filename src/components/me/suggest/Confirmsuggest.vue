<template>
    <div id="sugForm">
      <div class="type clearfix" @click="toShow">
        <span class="type clearfix">问题类型</span>
        <!--选择器-->
        <span class="typeText">
          {{stateValue}}
        </span>
        <div class="rightArrow">
          >
        </div>
      </div>
      <div class="phone clearfix">
        <span class="phoneName">手机号码</span>
        <input type="number" name="iphone" id="iphone" placeholder="填写后方便我们与您联系" ref="phoneText">
      </div>
      <div class="detail clearfix">
        <span class="title">建议描述</span>
        <textarea name="detailText" id="text" cols="30" rows="10" :placeholder="placeholderValue" v-model="textValue" ref="sugText"></textarea>
        <span class="number" >{{textValue.length}}/500</span>
      </div>
      <div class="upload clearfix">
        <span class="uploadPic">上传图片</span>
        <!--添加图片进里面-->
        <span class="addMain">
         <ul>
           <li v-for="(item,index) in myImages" :key="index" >
             <img :src="item" alt="" class="addPic">
             <img src="@/assets/images/me_close.png" alt="" @click="deleteImage(index)">
           </li>
           <li>
              <van-uploader :after-read="onRead"  multiple>
                <img src="@/assets/images/addPic.png" alt="添加图片" title="添加图片" class="addPic">
              </van-uploader>
           </li>
          </ul>
        </span>
        <div class="text" v-if="myImages.length==0">最多4张选填,提供问题截图,每张10M以内</div>
      </div>
      <div class="submits clearfix">
        <div class="submit" @click="submit">提交</div>
      </div>
      <vue-pickers
        :show="show"
        :columns="columns"
        :defaultData="defaultData"
        :selectData="pickData"
        @cancel="close"
        @confirm="confirmFn"></vue-pickers>
      <div class="clearfix">

      </div>
       <!-- <van-popup v-model="pickShow" position="bottom" :overlay="true">

        </van-popup>-->
    </div>
</template>

<script>
  import { Dialog,Popup,Toast } from 'vant';
  import vuePickers from 'vue-pickers'
  export default {
      name: "Confirmsuggest",
      data(){
        return {
          options: [
              {
              value: '选项1',
              label: '黄金糕'
            },{
              value: '选项2',
              label: '双皮奶'
            },{
              value: '选项3',
              label: '蚵仔煎'
            },{
              value: '选项4',
              label: '龙须面'
            },{
              value: '选项5',
              label: '北京烤鸭'
            }
          ],
          stateValue:'',
          columns: 1,
          show: false,
          pickShow: false,
          placeholderValue:'对我们的产品和服务有什么建议吗?你还有什么建议吗?你希望我们未你解决什么问题?请告诉我们...',
          textValue:'',
          myImages:[],
          defaultData: [
            {
              text: '你选错了值',
              value: '请重新选值'
            }
          ],
          pickData: {
            // 第一列的数据结构
            data1: [
              {
                text: '功能异常',
                value: '功能异常'
              },
              {
                text: '客户服务',
                value: '客户服务'
              },
              {
                text: '产品建议',
                value: '产品建议'
              },
              {
                text: '其他',
                value: '其他'
              }
            ]
          },
          company_id: '',
          staff_id:''
        }
      },
      mounted() {
        this.company_id = this.getCookie('company_id');
        this.staff_id = this.getCookie('staff_id');
      },
    created() {
      this.$store.commit('getActive',4)
    },
      computeds:{
        confineLength(){
          (this.textValue.length>500) ? this.textValue = this.textValue.slice(0, 500):'';
        }
      },
      methods:{
        onSearch() {
          console.log(this.value);
        },
        getState() {
          this.pickShow=false
        },
        onConfirms(val) {
          console.log(val);
          this.stateValue=value;
          this.show=false;
          // Toast(`当前值：${value}, 当前索引：${index}`);
        },
        onCancels() {
          this.showw=false;
        },
        choose(){
          this.pickShow=true
        },
        autoHeight(){
         this.$nextTick(()=>{
           function $(id) {
             return document.getElementById(id);
           }
           console.log(document.getElementById(text));
           $("text").onkeyup = function() {
             this.style.height = 'auto';
             this.style.height = this.scrollHeight/100*2 + "rem";
           }
         })
        },
        onRead(file) {
          if (this.myImages.length==4) {
            Dialog.alert({
              title: '',
              message: '图片数量不能超过四张'
            }).then(() => {
              // on close
            });
          }else {
            console.log(file);
            this.myImages.push(file.content)
          }
        },
        deleteImage(index) {
          this.myImages.splice(index,1)
        },
        close() {
          this.show = false
        },
        confirmFn(val) {
          this.show = false
          this.stateValue = val.select1.value;
        },
        toShow() {
          this.show = true
        },
        matchPhone(){
        },
        submit(){
          const type= 'feedback';
          const token = '1dba21bd8e6bb5e187f574df5edb8cb7';
          var back_type;
          const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
          let qs = require('qs');



       /*   const company_id = this.getCookie('company_id',res.data[0].company_id);
          const staff_id = this.getCookie('staff_id',res.data[0].staff_id);*/


          //根据问题类型
          switch (this.stateValue) {
            case '功能异常': back_type = '1';break;
            case '客户服务': back_type = '2';break;
            case '产品建议': back_type = '3';break;
            case '其他': back_type = '4';break;
          }

          reg.test(this.$refs.phoneText.value)? '':Toast('请输入正确的手机号');
          this.stateValue.length==0?Toast('请选择你的问题类型'):'';
          this.$refs.sugText.value.length==0?Toast('请输入你的建议描述'):'';

          if(( this.stateValue.length==0&&this.$refs.sugText.value.length==0&&this.$refs.phoneText.value.length==0)){
            Toast('请输入您的建议和手机号和问题类型');
          }else{
            this.axios.post('feedback.php',{
              type: 'feedback',
              token: token,
              back_type:back_type,
              content: this.textValue,
              img:this.myImages,
            /* company_id: this.company_id,
              staff_id: this.staff_id*/
            }).then(res=>{
              console.log(res,'成功')
            }).catch(fail=>{
              console.log(fail,'失败')
            });
          }


        }
      },
      watch:{
        'textValue': 'autoHeight'
      },
      components: {
        vuePickers
      },
  }
</script>

<style scoped lang="scss">
  $lineColor: rgb(224,224,224);
  $sl: #009cff;
  $mar-L2: .2rem;
  @mixin divPublicss{
    padding: .2rem 0;
    border-bottom: 1px solid $lineColor;
  }
  #sugForm{
    padding: 0 .4rem 0;
    font-size: .46rem;
    div.type{
      position: relative;
      padding: .3rem 0;
      border-bottom: 1px solid $lineColor;
      span.type{
        float: left;
        display: block;
      }
      span.typeText{
        float: left;
        display: block;
        margin-left: $mar-L2;
      }
      div.rightArrow{
        position: absolute;
        right: 0;
        width: .3rem;
        height: .5rem;
      }
    }
    div.phone{
      @include divPublicss;
      span.phoneName{
        vertical-align: middle;
      }
      input[type='tel']{
        vertical-align: middle;
        margin-left: $mar-L2;
      }
    }
    div.detail{
      span.title{
        float: left;
      }
      @include divPublicss;
      textarea{
        margin-left: $mar-L2;
        float: left;
        border: none;
        vertical-align: top;
        height: 2rem;
      }
      span.number{
        display: block;
        text-align: right;
      }
    }
    div.upload{
      span.uploadPic{
        flex: .5 0 auto;
      }
      display: flex;
      @include divPublicss;
      img.addPic{
        vertical-align: text-top;
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
      }
      div.van-uploader{
        flex: .5 0 auto !important;
        text-align: center;
      }
      div.text{
        margin-top: .5rem;
        margin-left: .5rem;
        width: 3rem;
        font-size: .36rem;
        color: #999;
      }
      span.addMain {
        ul {
          width: 100%;
          li {
            float: left;
            margin-top: .5rem;
            margin-left: .5rem;
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
              width: 2.5rem;
              height: 2.5rem;
            }
          }
          li:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
      border: none;
    }
    div.submits{
      margin-top: 1rem;
      width: 100%;
      div.submit{
        width: 90%;
        margin: 0 auto;
        line-height: 1.2rem;
        background: $sl;
        color: #ffffff;
        font-size: .49rem;
        text-align: center;
        border-radius: 5px;
      }
    }
  }

</style>
