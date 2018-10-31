<template>
  <div id="chatting" scroll="no">
    <!--时间-->
    <div ref="scrollBottom" style="overflow: auto;height: 85vh;padding-bottom: 1.3rem" @click="hideEmotion">
      <div class="time">
       <span class="displayTime">
         {{timer}}
       </span>
      </div>
      <div class="content">
        <div class="message" v-for="(item,index) in arr" :key="index">
          <!--meMessage-->
          <div id="meMes" class="clearfix" v-if="item.type">
            <div class="meMessage">
              <span class="ifRead">{{ item.read }}</span>
              <div class="main" v-html="item.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
                <!--{{ item.content }}-->
              </div>
              <div class="triangle-let">
              </div>
              <!--<div class="main" v-html="content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
                <div class="triangle-let">
                </div>
              </div>-->
              <img :src="item.src" alt="" class="logo">
            </div>
          </div>
          <!--serviceMessage-->
          <div id="serviceMes" class="clearfix" v-else-if="!item.type">
            <div class="serviceMessage">
              <img :src="item.src" alt="" class="logo">
              <div class="main">
                {{ item.content }}
              </div>
              <div class="triangle-right">
              </div>
              <span class="no">{{ item.read }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--底部输入-->
    <!--<div class="Input clearfix" :class="isShow?'moveIn':'moveOut'">-->
    <div class="Input clearfix" ref="fixed">
      <!--输入系列-->
      <div class="main-top">
        <!--<img src="@/assets/images/voice.png" alt="" class="voice">-->
        <!--<input type="text" name="textInput" id="textInput" class="clearfix" v-model="sendValue">-->

        <!--<div contenteditable="true" class="clearfix editable" @input="changeText" ref="getValue" v-model="value" v-html="content">{{content}}</div>-->
        <!--v-html="content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"-->
        <textarea ref="focus" v-autosize v-model="content" @input="changeText" @click="changeEmotion" style="max-height: 150px;resize:none;width: 7.5rem;outline: none;border: 1px solid #92a5b4;padding:.2rem .1rem .1rem .1rem;box-sizing: border-box;margin-left: .2rem"></textarea>
        <img :src='isShow?keyPng:facePng' alt="" class="face" @click="replaceEmotion">
        <div>
          <img src="@/assets/images/append.png" alt="" class="append" v-show="flag">
          <van-uploader :after-read="onRead" multiple>
            <van-icon name="photograph" />
          </van-uploader>
        </div>
        <input type="button" class="send" value="发送" v-show="!flag" @click="send">
      </div>
      <!--表情包-->
      <emotion @emotion="handleEmotion" :height="200"></emotion>
    </div>
    <div class="text-place">
      <!-- /\#[\u4E00-\u9FA5]{1,3}\;/gi 匹配出含 #XXX; 的字段 -->
      <!--<p v-html="content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">{{ content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion) }}</p>-->
    </div>
  </div>
</template>

<script>
  // import vueEmoji from '@/components/chat/emoji.vue';
  import Emotion from '@/components/chat/Emotion/index'
  import facePng from '@/assets/images/face.png';
  import keyPng from '@/assets/images/key.png'
  import EditDiv from '../../components/template/EditDiv'

  export default {
    name: "chatts",
    data(){
      return {
        isShow: false,
        showEmoji:false,
        facePng: facePng,
        keyPng: keyPng,
        sendValue:'',
        arr:[
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好;#衰;',read:'未读',type:1},
          {name:'陈鸿真',src:require('@/assets/images/logo.png'),content:'大家好',read:'未读',type:0},
          {name:'陈鸿真',src:require('@/assets/images/logo.png'),content:'大家好',read:'未读',type:0},
          {name:'陈鸿真',src:require('@/assets/images/logo.png'),content:'大家好',read:'未读',type:0},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966377269&di=53d7b51c3ac86157aa572beabcb7128c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3812b31bb051f819d6c4866dd1b44aed2e73e730.jpg"></img>',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈某某',src:require("@/assets/images/logo.png"),content:'大家好',read:'未读',type:1},
          {name:'陈鸿真',src:require('@/assets/images/logo.png'),content:'大家好',read:'未读',type:0},
        ],
        content: '',
        comment: '',
        canEdit:true,
        flag:true,
        count:0,
        file:''
      }
    },
    mounted() {
      this.scrollBottom();
    },
    computed: {
      timer() {
        const newDate = new Date();
        return this.formatDate(newDate);
      },
    },
    methods: {
      scrollBottom() {
        let ele=this.$refs.scrollBottom;
        ele.scrollTop = ele.scrollHeight;
      },
      hideEmotion() {
        let dom=this.$refs.fixed;
        dom.className='Input clearfix moveOut';
      },
      onRead(file) {
        this.file=file;
      },
      scrolls() {
        let ele=this.$refs.scrollBottom;
        ele.scrollIntoView()
      },
      changeText() {
        this.flag=this.content==''?true:false;
        // console.log(this.content);
        // this.innerText = this.$el.innerHTML;
        // this.$emit('input', this.innerText);
      },
      replaceEmotion() {
      let dom=this.$refs.fixed;
      if (!this.isShow) {
        this.isShow=!this.isShow;
        dom.className='Input clearfix moveIn';
      }else {
        dom.className='Input clearfix moveOut';
        this.$refs.focus.focus();
        this.isShow=!this.isShow;
      }
    },
      changeEmotion() {
        let dom=this.$refs.fixed;
        if (this.count >= 1) {
          this.isShow=false;
          dom.className='Input clearfix moveOut';
        }
        this.count++;
      },
      handleEmotion (i) {
        this.content += i;
        this.flag=this.content==''?true:false;
      },
      send() {
        this.flag=true;
        this.isShow=false;
        let dom=this.$refs.fixed;
        let ele=this.$refs.scrollBottom;
        ele.scrollTop = ele.scrollHeight;
        dom.className='Input clearfix moveOut';
        console.log(this.file);
        let data=this.content;
        let ws=new WebSocket('ws://192.168.1.18:1234');
        ws.onopen=function () {
          ws.send(JSON.stringify({
            type:2,
            uid:'1',
            to:'11',
            message:data
          }))
          ws.onmessage=function (e) {
            console.log(e.data);
          }
        }

        this.arr.push({name:'陈某某',src:require('@/assets/images/logo.png'),content:this.content,read:'未读',type:1})
        this.content='';
        console.log(this.content);

        this.scrollBottom();
      },
      // 将匹配结果替换表情图片
      emotion (res) {
        let word = res.replace(/\#|\;/gi,'')
        const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
        let index = list.indexOf(word)
        return `<img style="width:auto;" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
      },
      // 时间统一函数
      getTimeText(argument) {
        var timeS = argument;
        var todayT = ''; //
        var yestodayT = '';
        var timeCha = this.getTimeS(timeS);
        timeS = timeS.slice(-8);
        todayT = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;
        yestodayT = todayT + 24 * 60 * 60 * 1000;
        if (timeCha > yestodayT) {
          return argument.slice(0, 11);
        }
        if (timeCha > todayT && timeCha < yestodayT) {
          return timeS.slice(0, 2) > 12 ? '昨天 下午' + (timeS.slice(0, 2) == 12 ? 12 : timeS.slice(0, 2) - 12) + timeS.slice(2, 5) : '昨天 上午' + timeS.slice(0, 5);
        }
        if (timeCha < todayT) {
          return timeS.slice(0, 2) >= 12 ? '下午' + (timeS.slice(0, 2) == 12 ? 12 : timeS.slice(0, 2) - 12) + timeS.slice(2, 5) : '上午' + timeS.slice(0, 5);
        }
      },
      //时间戳获取
      getTimeS(argument) {
        var timeS = argument;
        timeS = timeS.replace(/[年月]/g,'/').replace(/[日]/,'');
        return new Date().getTime() - new Date(timeS).getTime() - 1000; //有一秒的误差
      },
      //获取年月日
      formatDate(now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "年" + month + "月" + date + "日" + hour + ":" + minute + ":" + second;
      },
    },
    components:{
      Emotion,
      EditDiv,
    }
  }
</script>

<style scoped lang="scss">
  .van-uploader {
    position: absolute;
    display: inline-block;
    right: .8rem;
    opacity: 0;
  }
  $color-99: #9999;
  $color-sL: #598dcf;
  @mixin triangle-left{
    position: absolute;
    width: 0;
    height: 0;
    border-top: .25rem solid transparent;
    border-left: .25rem solid  #c9e7ff;
    border-bottom: .25rem solid transparent;
  }
  @mixin triangle-right{
    position: absolute;
    width: 0;
    height: 0;
    border-top: .25rem solid transparent;
    border-right: .25rem solid  #fff;
    border-bottom: .25rem solid transparent;
  }
  span.alery{
    font-size: .34rem;
    color:  $color-99;
  }
  span.no{
    font-size: .34rem;
    color:  $color-sL;
  }
  @mixin div{
    width: 1rem;
    height: 1rem;
  }
  @mixin img{
    width: 100%;
    height: 100%;
  }
  .send {
    /*padding: 0 25px;*/
    position: absolute;
    right: .3rem;
    bottom: 82%;
    background: #3e84ff;
    border: 1px solid #3e84ff;
    width: 1.3rem;
    height: .9rem;
    text-align: center;
    color: #fff;
    border-radius: .1rem;
  }
  #chatting{
    border: 1px solid #f7faff;
    width: 100%;
    height: 100%;
    background: #f7faff;
    /*padding-bottom: 2rem!important;*/
    div.time{
      margin: .35rem auto 0;
      text-align: center;
      span.displayTime{
        padding: .20rem .15rem;
        color: #ffffff;
        font-size: .375rem;
        background: #d4d4d4;
        border-radius: 5px;
      }
    }
    div.Input{
      position: fixed;
      bottom: -200px;
      left: 0;
      background: #fff;
      border-top: 1px solid #e6eae9;
      width: 100%;
      z-index: 5;
      div.main-top{
        display: flex;
        align-items: center;
        padding: .15rem .1rem;
        input[type='text']{
          margin-left: .2rem;
          width: 7.5rem;
          border: 1px solid #eee;
          height: 44px;
          margin-right: .5rem;
          background: #fefdff;
        }
        img.face{
          margin-left: .35rem;
        }
        img.append{
          margin-left: .26rem;
          margin-right: .27rem;
        }
        img.voice,img.face,img.append{
          width: .9rem;
          height: .9rem;
          position: absolute;
          bottom: 82%;
        }
        img.face {
          right: 1.75rem;
        }
        img.append {
          right: .3rem;
        }
      }
    }
    div.meMessage{
      margin-top: .35rem;
      margin-right: .26rem;
      float: right;
      display: flex;
      align-content: center;
      align-items: center;
      position: relative;
      span.ifRead{
        margin-right: .25rem;
        font-size: .34rem;
        color:  #598dcf;
      }
      div.main{
        margin-right: .25rem;
        padding: .2rem;
        max-width: 3rem;
        line-height: .56rem;
        /*text-align: center;*/
        font-size: .4rem;
        word-break: break-all;
        background: #c9e7ff;
      }
      div.triangle-let{
        position: absolute;
        right: 1.3rem;
        top: 50%;
        @include triangle-left;
      }
      img.logo{
        width: 1.22rem;
        height: 1.22rem;
      }
    }
    div.serviceMessage{
      margin-top: .35rem;
      margin-left: .26rem;
      float: left;
      display: flex;
      align-content: center;
      position: relative;
      align-items: center;
      span.no{
        margin-left: .25rem;
        font-size: .34rem;
        color:  $color-sL;
      }
      div.main{
        margin-left: .25rem;
        padding: .2rem;
        max-width: 2.9rem;
        line-height: .56rem;
        word-break: break-all;
        font-size: .4rem;
        background: #ffffff;
      }
      div.triangle-right{
        position: absolute;
        top: 50%;
        left: 1.3rem;
        @include triangle-right;
      }
      img.logo{
        width: 1.22rem;
        height: 1.22rem;
      }
    }
  }
  .emoji-box{
    z-index: 66;
    background: white;
    margin-bottom: -5rem;
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
      bottom: 0;
    }
    100% {
      bottom: -200px;
    }
  }
  @keyframes emoji-move-in{
    0% {
      bottom: -200px;
    }
    100% {
      bottom: 0;
    }
  }
  .moveIn{
    -webkit-animation: emoji-move-in .3s ease-in-out forwards;
    -o-animation: emoji-move-in .3s ease-in-out forwards;
    animation: emoji-move-in .3s ease-in-out forwards;
  }
  .moveOut{
    -webkit-animation: emoji-move-out .3s ease-in-out forwards;
    -o-animation: emoji-move-out .3s ease-in-out forwards;
    animation: emoji-move-out .3s ease-in-out forwards;
  }
  .editable {
    width: 7rem;
    min-height: .8rem;
    max-height: 120px;
    line-height: .8rem;
    margin-left: .2rem;
    padding: .1rem 0rem .1rem .2rem;
    outline: 0;
    border: 1px solid #a0b3d6;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    _overflow-y: visible;
  }
</style>
