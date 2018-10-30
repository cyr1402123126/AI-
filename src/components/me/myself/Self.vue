<template>
  <!--<div id="applyState" :class="showInput?'pos':''">-->
  <div id="applyState">
    <div class="applyState-content clearfix" v-for="(item,index) in state" :key="index">
      <div class="left">
        <img :src="item.src" alt="">
      </div>
      <div class="applyState-cicle">
        <h3>{{ item.person }}</h3>
        <p>{{ item.content }}</p>
        <div class="applyState-images">
          <img  v-for="(value,index) in item.images" :key="index" :src="value" alt="">
        </div>
        <div class="applyState-time clearfix">
          <span class="left">昨天</span>
          <!--<img class="right" src="@/assets/images/info_alert.png" alt="" >-->
        </div>
        <div class="applyState-box" v-show="flag">
          <ul>
            <li v-for="(val,index) in item.comment" :key="index" @touchstart="showDeleteButton(val,item)" @touchend="clearLoop" @click="reply(item.comment[index],item)"><span v-html="val.name"></span>:<span class="consult">{{ val.content }}</span></li>
          </ul>
          <div class="triangle-up"></div>
        </div>
      </div>
    </div>
    <div class="Dialog">
      <van-dialog
        v-model="show"
        show-cancel-button
        :before-close="beforeClose"
      >
        <div class="comment">删除</div>
        <div class="ifDelete">确定删除此条回复</div>
      </van-dialog>
    </div>
    <!--replay-->
    <div id="reply" :class="showInput?'moveOut':'moveIn'">
      <div class="btInput">
        <input type="text" name="" id="" :placeholder="replyName" ref="inputComment" v-model="commentValue">

        <!--<img :src='isShow?keyPng:facePng' alt="" class="face"  v-if="!commentValue">-->
        <!--<div class="send" v-if="commentValue" @click="send">发送</div>-->
        <div class="send" @click="send">发送</div>
      </div>
      <!--emoji-->
      <!--      <div class="emoji-box"  v-if="showEmoji" :class="isShow?'moveIn':'moveOut'">
              <el-button
                class="pop-close"
                :plain="true"
                type="danger"
                size="mini"
                icon="close"
                @click="showEmoji = false"
              ></el-button>
              <vue-emoji
                @select="selectEmoji">
              </vue-emoji>
              <span class="pop-arrow arrow"></span>
            </div>-->
    </div>
  </div>
</template>

<script>
  // import vueEmoji from '../../components/public/emoji.vue'
  import facePng from '@/assets/images/face.png'
  import keyPng from '@/assets/images/key.png'
  import { Toast } from 'vant';
  export default {
    name: "Self",
    data() {
      return {
        show: false,
        flag:true,
        commentContent: '',
        deleteIndex:'',
        deleteItem: null,
        showEmoji: true,
        isShow: false,
        showInput: false,
        facePng: facePng,
        keyPng: keyPng,
        replyItem: null,
        replyName: null,
        commentValue: null,
        state:[
          // {src:require("@/assets/images/logo.png"),person:"龙虾下",content:"哈哈哈哈",images:[require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png')],human:["陈鸿真","陈鸿真"],comment:[{name:"陈鸿真",content:"厉害了我的哥"},{name:"陈鸿真",content:"厉害了我的哥"},{name:"陈鸿真",content:"厉害了我的哥"}]},
          // {src:require("@/assets/images/logo.png"),person:"龙虾下",content:"哈哈哈哈",images:[require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png')],human:["陈鸿真","陈鸿真"],comment:[{name:"陈鸿真",content:"厉害了我的哥"},{name:"陈鸿真",content:"厉害了我的哥"},{name:"陈鸿真",content:"厉害了我的哥"}]},
          // {src:require("@/assets/images/logo.png"),person:"龙虾下",content:"哈哈哈哈",images:[require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png')],human:["陈鸿真","陈鸿真"],comment:[{name:"陈鸿真",content:"厉害了我的哥"},{name:"陈鸿真",content:"厉害了我的哥"},{name:"陈鸿真",content:"厉害了我的哥"}]},
        ]
        // state:[]
      }
    },
    methods: {
      showDeleteButton(item,parent) {
        if (item.name.indexOf(parent.person)!=-1) {
          const that = this;
          this.$set(this, 'deleteItem', item);
          clearInterval(this.Loop);//再次清空定时器，防止重复注册定时器
          this.Loop = setTimeout(function () {
            that.show = !that.show;
          }, 600);
        }
      },
      clearLoop() {
        clearInterval(this.Loop);
      },
      beforeClose(action, done) {
        const that = this;
        if (action === 'confirm') {
          setTimeout(done, 1000);
          this.remove(this.deleteItem);
        } else {
          done();
        }
      },
      indexOf(val) {
        var arrState = this.state;
        var deIndex;
        arrState.map((item) => {
          item['comment'].map((item2, index) => {
            if (item2 == val) {
              deIndex = index;
            }
          })
        })
        return deIndex;
      },
      //删除
      remove(val) {
        console.log(val);
        var index = this.indexOf(val);
        this.state.map(item => {
          index > -1 ? item['comment'].splice(index, 1) : ''
        })
        this.axios.post('https://mp.wedotop.com/Api/dynamic_detail.php',{
          token: "a3d529d5085ef093cd36dc4cae09d599",
          type: "detail",
          category: "del_comment",
          comment_id: val.id
        }).then(res => {
          console.log(res);
        })
      },
      //添加回复
      addReply(val) {
        var index = this.indexOf(val);
        var commentCotent = this.commentValue
        this.state[0].comment.push({
          name: '我' + this.replyName,
          content: commentCotent
        });

        // console.log(this.item.comment);
      },
      //选择emoji
      selectEmoji(code) {
        this.showEmoji = true
        this.commentValue += code
      },
      //回复
      reply(item,parent) {
        console.log(item);
        console.log(item.name.indexOf('回复')==-1);
        console.log(item.name.indexOf(parent.person)==-1);
        console.log(parent.person);
        if (item.name.indexOf(parent.person)==-1 && item.name.indexOf('回复')==-1) {
          this.$set(this, 'replyName', '回复' + item.name);
          this.$set(this, 'replyItem', item)
          this.showInput = true;
          this.$refs.inputComment.focus()
          // 解决输入法遮挡
          var timer = null;
          document.body.scrollTop=1000000;
        }
      },
      //发送
      send(item){
        console.log(this.commentValue);
        if (this.commentValue == null || this.commentValue == '') {
          Toast('发送信息不能为空');
        }else {
          const that=this;
          this.showInput = !this.showInput;
          var commentValue = that.commentValue;
          var replyItemId = that.replyItem.id;
          console.log("comment_id---"+commentValue);
          console.log("content---"+replyItemId);
          this.axios.post('https://mp.wedotop.com/Api/dynamic_detail.php',{
            token:"a3d529d5085ef093cd36dc4cae09d599",
            type:"detail",
            category:"reply",
            comment_id:replyItemId,
            content: commentValue,
          }).then(res=>{
            that.addReply(res.data);
            that.commentValue = '';
            let data=res.data.state.comment;
            let arr=[];
            data.forEach(val=>{
              // console.log(val);
              arr.push(val)
              if (val.reply) {
                val.reply.forEach(item=>{
                  arr.push(item)
                });
              }else {
                arr.push(val)
              }
            })
            // console.log(arr);
            res.data.state.comment=arr
            // console.log(res.data.state.person);
            this.state=[res.data.state];
          })
        }
      }
    },
    created(){
      window.addEventListener('contextmenu', function(e){
        e.preventDefault();
      });
      // console.log(this.$route.params.id);
      this.axios.post('dynamic_detail.php',{
        token:"a3d529d5085ef093cd36dc4cae09d599",
        type:"detail",
        category:"detail",
        dynamic_id:this.$route.params.id
      }).then(res=>{
        // console.log(res.data.state.comment);
        // that.state.push([res.data.state]);

        let data=res.data.state.comment;
        let arr=[];
        console.log(data ==null);
        if (data.length==0) {
          this.flag=false;
        }
        data.forEach(val=>{
          // console.log(val);
          arr.push(val)
          if (val.reply) {
            val.reply.forEach(item=>{
              // console.log(item);
              arr.push(item)
              // console.log(arr);
            });
          }else {
            arr.push(val)
          }
        });
        // console.log(arr);
        res.data.state.comment=arr
        // console.log(res.data.state.person);
        this.state=[res.data.state];

      })
    },
    components:{
      // vueEmoji
    }
  }
</script>

<style scoped lang="scss">
  #reply{
    z-index: 999;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
    div.btInput{
      padding: .3rem;
      height: 1rem;
      background: rgb(250,250,250);
      img.face{
        margin: 0 .4rem;
        width: 1rem;
        height: 1rem;
        vertical-align: top;
      }
      div.send{
        float: left;
        margin-left: .3rem;
        width: 1.6rem;
        line-height: 1rem;
        text-align: center;
        vertical-align: middle;
        font-size: .36rem;
        background: #1aad19;
        color: #ffffff;
      }
    }
  }
  #reply.moveIn{
    left: 0;
    transform: translateY(100%);
    transition: .3s ease-in-out;
  }
  #reply.moveOut{
    left: 0;
    transform: translateY(0);
    transition: .3s ease-in-out;
  }
  #reply input[type='text']{
    float: left;
    width: 80%;
    height: 1rem;
    border: 1px solid rgb(220,220,220);
    border-radius: 5px;
    text-indent: 10px;
  }
  .Dialog{
    div.comment{
      padding: .2rem 0;
      text-align: center;
      font-size:.48rem;
    }
    div.ifDelete{
      font-size: .48rem;
      color:rgb(31,13,13);
      text-align: center;
    }
    div.van-field__control{
      border: 1px solid rgb(246,246,246)!important;
    }
  }
  #applyState {
    padding: 0rem .5rem;
  }
  .applyState-content {
    padding: .5rem 0 .6rem 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .applyState-content>.left {
    width: 1.25rem;
  }
  .applyState-content>.left img {
    border-radius: 50%;
  }
  .applyState-cicle {
    overflow: hidden;
    margin-left: 1.5rem;
  }
  .applyState-cicle .applyState-images img {
    width: 2.3rem;
    height: 2.3rem;
    margin: .12rem .12rem .12rem 0;

  }
  h3 {
    color: #61739b;
    font-size: .42rem;
  }
  p,span,li {
    line-height: 1.5;
    font-size: 0.38rem;
  }
  .applyState-time {
    margin-top: .15rem;
  }
  .applyState-time img {
    width: .55rem;
    margin-right: .2rem;
  }
  .applyState-box  {
    width: 100%;
    background: rgb(243,243,245);
    margin-top: .3rem;
    position: relative;
    padding:.15rem .3rem .2rem 0;
  }
  .applyState-love {
    padding-bottom: .10rem;
    border-bottom: 1px solid #e5e5e5;
    padding-left: .35rem;
  }
  .applyState-box ul {
    padding-left: .35rem;
    padding-top: .1rem;
  }
  .applyState-box .applyState-love img {
    width: .35rem;
  }
  .applyState-box .applyState-love>span {
    margin-left: .1rem;
    color: #919192;
  }
  .applyState-box ul li {
    color: #516692;
    line-height: .8rem;
  }
  .applyState-box ul li>span {
    /*color: #4a4a4a;*/
  }
  .triangle-up {
    position: absolute;
    left: .5rem;
    top: -.2rem;
    width: 0;
    height: 0;
    border-left: .2rem solid transparent;
    border-right: .2rem solid transparent;
    border-bottom: .2rem solid #f3f3f5;
  }


  div.emoji-box{
    z-index: 66;
    background: white;
    margin-bottom: 0;
    .el-button {
      position: absolute;
      border: none;
      color: #FF4949;
      right: 12px;
      top: 12px;
      z-index: 10;
    }
    .arrow {
      left: 10px;
    }
  }
  //emoji淡入淡出
  @keyframes emoji-move-out{
    0% {
      margin-bottom: 0;
    }
    100% {
      margin-bottom: -5rem;
    }
  }
  @keyframes emoji-move-in{
    0% {
      margin-bottom: -5rem;
    }
    100% {
      margin-bottom: 0;
    }
  }
  .emoji-box.moveIn{

    -webkit-animation: emoji-move-in .3s ease-in-out forwards;
    -o-animation: emoji-move-in .3s ease-in-out forwards;
    animation: emoji-move-in .3s ease-in-out forwards;
  }
  .emoji-box.moveOut{
    -webkit-animation: emoji-move-out .3s ease-in-out forwards;
    -o-animation: emoji-move-out .3s ease-in-out forwards;
    animation: emoji-move-out .3s ease-in-out forwards;
  }
  #applyState.pos{
    position: fixed;
    left: 0;
    bottom: 5%;
  }
  .consult {
    color: #4a4a4a;
  }
</style>
