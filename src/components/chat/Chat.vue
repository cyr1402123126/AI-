<template>
  <div id="chatting">
    <!--时间-->
    <div class="time">
       <span class="displayTime">
         {{timer}}
       </span>
    </div>
    <!--底部输入-->
    <div class="Input clearfix">
      <!--输入系列-->
      <div class="main-top">
        <img src="@/assets/images/voice.png" alt="" class="voice">
        <input type="text" name="textInput" id="textInput" class="clearfix">
        <img :src='isShow?keyPng:facePng' alt="" class="face" @click="isShow=!isShow">
        <img src="@/assets/images/append.png" alt="" class="append">
      </div>
      <!--emoji-->
     <!-- <div class="emoji-box" v-if="showEmoji" :class="isShow?'moveIn':'moveOut'">
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
    <!--meMessage-->
    <div id="meMes" class="clearfix">
      <div class="meMessage">
        <span class="ifRead">已读</span>
        <div class="main">
          在的
          <div class="triangle-let">
          </div>
        </div>
        <img src="@/assets/images/logo.png" alt="" class="logo">
      </div>
    </div>
    <!--serviceMessage-->
    <div id="serviceMes" class="clearfix">
      <div class="serviceMessage">
        <img src="@/assets/images/logo.png" alt="" class="logo">
        <div class="main">
          我是加瓦斯库瑞普特
          <div class="triangle-right">
          </div>
        </div>
        <span class="no">未读</span>
      </div>
    </div>
  </div>
</template>

<script>
  // import vueEmoji from '@/components/chat/emoji.vue';
  import facePng from '@/assets/images/face.png';
  import keyPng from '@/assets/images/key.png'
  export default {
    name: "chatts",
    data(){
      return {
        emojiChar: "😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
        //0x1f---
        emoji: [
          "60a", "60b", "60c", "60d", "60f",
          "61b", "61d", "61e", "61f",
          "62a", "62c", "62e",
          "602", "603", "605", "606", "608",
          "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
          "63a", "63b", "63c", "63d", "63e", "63f",
          "64a", "64b", "64f", "681",
          "68a", "68b", "68c",
          "344", "345", "346", "347", "348", "349", "351", "352", "353",
          "414", "415", "416",
          "466", "467", "468", "469", "470", "471", "472", "473",
          "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
        ],
        emojis:[null],//qq、weacheat原始表情
        showEmoji: true,
        value: '',
        isShow: false,
        facePng: facePng,
        keyPng: keyPng
      }
    },
    mounted(){

    },
    computed: {
      timer() {
        const newDate = new Date();
        return this.formatDate(newDate);
      }
    },
    methods: {
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
      //选择emoji
      selectEmoji (code) {
        this.showEmoji = true
        this.value += code
      }
    },
    components:{
      // vueEmoji
    }
  }
</script>

<style scoped lang="scss">
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
    border-right: .25rem solid  #ffff;
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
  #chatting{
    border: 1px solid #ebebeb;
    width: 100%;
    height: 17.66rem;
    background: #ebebeb;
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
      bottom: 0;
      left: 0;
      background: #ffffff;
      div.main-top{
        display: flex;
        align-items: center;
        padding: .15rem .1rem;
        input[type='text']{
          margin-left: .2rem;
          width: 6.6rem;
          border-bottom: 1px solid #828990;
        }
        img.face{
          margin-left: .35rem;
        }
        img.append{
          margin-left: .26rem;
          margin-right: .27rem;
        }
        img.voice,img.face,img.append{
          width: 1rem;
          height: 1rem;
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
      span.ifRead{
        margin-right: .25rem;
        font-size: .34rem;
        color:  $color-99;
      }
      div.main{
        position: relative;
        margin-right: .25rem;
        padding: .2rem;
        max-width: 2.9rem;
        line-height: .56rem;
        text-align: center;
        font-size: .4rem;
        word-break: break-all;
        background: #c9e7ff;
        div.triangle-let{
          position: absolute;
          top: 50%;
          right: -.14rem;
          @include triangle-left;
        }
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
      align-items: center;
      span.no{
        margin-left: .25rem;
        font-size: .34rem;
        color:  $color-sL;
      }
      div.main{
        position: relative;
        margin-left: .25rem;
        padding: .2rem;
        max-width: 2.9rem;
        line-height: .56rem;
        word-break: break-all;
        font-size: .4rem;
        div.triangle-right{
          position: absolute;
          top: 50%;
          left: -.14rem;
          @include triangle-right;
        }
        background: #ffffff;
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
</style>
