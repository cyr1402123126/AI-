<template>
  <div class="rader-container">
    <div class="title">
      <ul>
        <!--<li class="active"><router-link :to="{name:'time',params:{id:-1}}">时间</router-link></li>-->
        <li><router-link :to="{name:'time'}">天时</router-link></li>
        <li class="active"><router-link :to="{name:'behavior'}">地利</router-link></li>
        <li><router-link :to="{name:'person'}">人和</router-link></li>
      </ul>
    </div>
    <div class="rader-day">
      <SelectTime></SelectTime>
      <!--<p class="clearfix">
        7天内被查看的行为统计
        <span class="right"><img src="~@/assets/images/calendar.png" alt=""></span>
      </p>-->
      <ul>
        <li v-for="(item,index) in type" :key="index">
          <!--<router-link :to="{name:'time',params:{id:index}}">-->
          <router-link :to="{name:'lookCard'}">
            {{ item.content }} <span>{{item.sum}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import SelectTime from '@/components/template/SelectTime'
  export default {
    name: "Behavior",
    data(){
      return {
        type:[
         /* {"content":"查看商品","sum":10},
          {"content":"查看官网","sum":11},
          {"content":"复制微信","sum":10},
          {"content":"转发名片","sum":10},
          {"content":"查看名片","sum":10},
          {"content":"查看动态","sum":10},
          {"content":"咨询产品","sum":10},
          {"content":"保存电话","sum":10},
          {"content":"觉得靠谱","sum":10},
          {"content":"拨打电话","sum":10},
          {"content":"播放语音","sum":10},
          {"content":"复制邮箱","sum":10},*/
        ]
      }
    },
    created() {
      this.axios.get('action.php?type=behavior&token=4f36b41cc2d10a4a8f22d712fa342599').then(res=>{
      // this.axios.get('type').then(res=>{
        this.type=res.data;
      })
    },
    components:{
      SelectTime,
    },
  }
</script>

<style scoped>
  .rader-container {
    padding: .4rem .5rem;
  }
  .rader-container .title ul {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
  }
  .rader-container .title li {
    width: 33.3%;
    background: #f5f5f5;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    float: left;
  }
  .active {
    background: #3e84ff!important;
  }
  .active a {
    color: #fff;
  }
  .rader-day>p {
    margin: .4rem 0;
    color: #696969;
    font-size: .32rem;
  }
  .rader-day img {
    width: .5rem;
  }
  .rader-day ul {
    border-top: 1px solid #f1f1f1;
  }
  .rader-day li {
    clear: both;
    height: 1.45rem;
    line-height: 1.45rem;
    border-bottom: 1px solid #f1f1f1;
    font-size: .4rem;
    text-indent: 1rem;
  }
  .rader-day li:nth-child(1) {
    background: url("~@/assets/images/rader_one.gif") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li:nth-child(2) {
    background: url("~@/assets/images/rader_two.gif") no-repeat left center;
        background-size: .6rem;
  }
  .rader-day li:nth-child(3) {
    background: url("~@/assets/images/rader_three.gif") no-repeat left center;
        background-size: .6rem;
  }
  .rader-day li:nth-child(4) {
    background: url("~@/assets/images/rader_four.gif") no-repeat left center;
        background-size: .6rem;
  }
  .rader-day li:nth-child(5) {
    background: url("~@/assets/images/rader_five.gif") no-repeat left center;
        background-size: .6rem;
  }
  .rader-day li:nth-child(6) {
    background: url("~@/assets/images/rader_six.gif") no-repeat left center;
        background-size: .6rem;
  }
  .rader-day li:nth-child(7) {
    background: url("~@/assets/images/rader_seven.gif") no-repeat left center;
        background-size: .6rem;
  }
  .rader-day li:nth-child(8) {
    background: url("~@/assets/images/rader_eight.gif") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li:nth-child(9) {
    background: url("~@/assets/images/rader_nine.gif") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li:nth-child(10) {
    background: url("~@/assets/images/rader_ten.gif") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li:nth-child(11) {
    background: url("~@/assets/images/rader_elevn.gif") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li:nth-child(12) {
    background: url("~@/assets/images/rader_twi.png") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li:nth-child(13) {
    background: url("~@/assets/images/rader_thirteen.gif") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li:nth-child(14) {
    background: url("~@/assets/images/rader_fourteen.gif") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li:nth-child(15) {
    background: url("~@/assets/images/rader_fifteen.gif") no-repeat left center;
    background-size: .6rem;
  }
  .rader-day li span {
    float: right;
  }
</style>
