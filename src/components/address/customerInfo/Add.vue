<template>
    <div class="wraper">
      <div class="select clearfix" @click="alertTag">
        <p class="left">{{ Tag }}</p>
        <img :src=" showImg ? active.right.src : active.bottom.src" :class="showImg ? active.right.class : active.bottom.class" alt="">
      </div>
      <div class="language" v-if="isShow">
        <ul>
          <li v-for="(item,index) in newTags" :key="index+'-label'" @click="replaceTag(item)">{{ item }}<img src="@/assets/images/delete.png" alt="" @click.stop="deleteTag(item,index)"></li>
          <li v-for="(item,index) in myTag" :key="index" @click="replaceTag(item)">{{ item }}</li>
          <li @click="addTag" style="color: #000;font-weight: bold">自定义常用语</li>
        </ul>
      </div>
      <div class="content" v-else-if="!isShow">
        <p class="discuss">跟进描述</p>
        <textarea v-autosize placeholder="在这里输入跟进语" v-model="discuss"></textarea>
        <span>{{ discuss.length }}/500</span>
        <div class="clearfix"></div>
        <input type="button" value="保存" @click="save">
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
          v-model="tag"
          placeholder="输入自定义标签"
        />
      </van-dialog>
    </div>
</template>

<script>
  export default {
    name: "Add",
    data() {
      return {
        discuss:'',
        isShow:false,
        myTag:['客户查看了公司产品，有合作意向','标记一下，客户有合作意向','客户多次查看小程序，合作意向强烈','计划近期安排拜访','意向客户，需安排拜访','见面聊过，客户有合作意向','曾拜访过的客户','标记一下，需给客户发送报价','已发报价，待客户反馈','已成交客户，维护好后续关系'],
        newTags:[],
        show:false,
        tag:'',
        label:'添加标签',
        lock:false,
        Tag:'选择跟进常用语',
        flag:true,
        showImg:true,
        active: {
          right: {
            src: require('@/assets/images/icons_right.png'),
            class:'right'
          },
          bottom: {
            src:require('@/assets/images/icons_bottom.png'),
            class:'bottom'
          }
        }
      }
    },
    created() {
      this.newTags = this.$store.state.newTags;
      this.$store.commit('getAddressActive',2);
    },
    watch: {
      discuss(val) {
        if (val.length == 500) {
          this.$toast('字数不能超过500');
        }
      },
    },
    methods: {
      addTag() {
        this.tag='';
        this.show=true;
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      done() {
        this.myTag.unshift(this.tag)
        this.show=false;
      },
      confirm() {
        console.log(this.tag);
        if (this.tag == '') {
          this.$toast('输入的标签不能为空');
          this.show=true;
        }else {
          // this.myTag.unshift(this.tag);
          this.show=false;
          this.$store.commit('saveTag',this.tag)
        }
      },
      replaceTag(data) {
        console.log(data);
        this.flag=true;
        this.showImg = !this.showImg;
        this.discuss = data;
        if (this.flag) {
          this.isShow=false;
          this.Tag=data;
          this.$store.commit('selectTag',data)
        }
      },
      deleteTag(item,index) {
        this.$dialog.confirm({
          title: '',
          message: '你确定要删除吗?'
        }).then(() => {
          this.flag=false;
          this.isShow=true;
          this.Tag = this.Tag == item ? '客户查看了公司产品，有合作意向' : this.Tag;
          this.$store.commit('selectTag','客户查看了公司产品，有合作意向');
          this.$store.commit('deleteTag',index)
          // on confirm
        }).catch(() => {
          // on cancel
        });
      },
      alertTag() {
        this.showImg = !this.showImg;
        this.isShow =! this.isShow;
      },
      save() {
        if (this.discuss.length == 0) {
          this.$toast('描述内容不能为空')
        }else {
          this.axios.post('customer_detail.php?type=customer_detail&token=af79028c6574ed3b6359b74ab0112796&category=follow_up',{
            customer_id: this.$route.params.id,
            content: this.discuss
          }).then(res => {

          }).catch(err =>{
            console.log(err);
          })
          this.$toast('跟进成功')
          this.$router.go(-1);
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .right {
    width: .25rem;
    height: .35rem;
    margin-right: 0.1rem;
  }
  .bottom {
    width: .55rem;
    height: .65rem;
    margin-top: -.15rem;
  }
  .wraper {
    padding: .4rem .5rem;
    width: 100%;
    box-sizing: border-box;
    color: #4a4a4a;
    font-size: .42rem;
    .select {
      color: #5176ab;
      position: relative;
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      clear: both;
      img {
        float: right;
      }
    }
    .discuss {
      margin: .6rem 0;
      color: #8a8888;
    }
    >span {
      margin-top: .2rem;
      display: inline-block;
      float: right;
    }
    input[type=button] {
      background: #3b83ff;
      color: #fff;
      width: 9.7rem;
      height: 1.5rem;
      line-height: 1.5rem;
      text-align: center;
      margin-top: 1.2rem;
      font-size: .46rem;
      border-radius: .15rem;
    }
    .language {
      width: 100%;
      height: 100%;
      color: #4a4a4a;
      li {
        width: 100%;
        height: 1.35rem;
        line-height: 1.35rem;
        text-align: center;
        position: relative;
        clear: both;
        img {
          width: .5rem;
          /*float: right;*/
          /*margin-top: .4rem;*/
          position: absolute;
          z-index: 3;
          right: 0;
          top: .4rem;
        }
      }
      li:first-child {
        margin-top: .55rem;
      }
      li:after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: -50%;
        right: -50%;
        /*-webkit-transform: scale(0.5);*/
        transform: scale(0.5);
        border-top: 1px solid #efefef;
        height: 0px;
      }
    }
  }
  input,button,select,textarea{outline:none}
  textarea{
    resize:none;
    background: #fff;
    width: 100%;
    height: 2.5rem;
    border: none;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:#b8b8b8;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#b8b8b8;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#b8b8b8;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#b8b8b8;
  }
  .van-cell {
    width: 85%;
    border: 1px solid #d6d6d6;
    margin: 0 auto;
  }
  .van-dialog .van-dialog__header {
    margin-bottom: .3rem;
  }
</style>
