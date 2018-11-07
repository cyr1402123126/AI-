<template>
  <div class="rader-container">
    <div class="title">
      <ul>
        <!--<li class="active"><router-link :to="{name:'time',params:{id:-1}}">时间</router-link></li>-->
        <li class="active"><router-link :to="{name:'time'}">天时</router-link></li>
        <li><router-link :to="{name:'behavior'}">地利</router-link></li>
        <li><router-link :to="{name:'person'}">人和</router-link></li>
      </ul>
    </div>
    <SelectTime></SelectTime>

    <!--标题-->
    <div class="time-container">
      <div class="left-box">
        <p>{{ Statistics.leftSum }}</p>
        <p>个访客</p>
      </div>
      <div class="right-box">
        <ul>
          <li>查看了你的商品<span>{{ Statistics.rightSum[0] }}</span>次</li>
          <li>查看了你的名片<span>{{ Statistics.rightSum[1] }}</span>次</li>
          <li>查看了你的官网<span>{{ Statistics.rightSum[2] }}</span>次</li>
        </ul>
      </div>
    </div>
    <!--内容-->
    <Info :introduce="introduce"></Info>
<!--    <div class="introduce" v-for="(item,index) in introduce" :key="index">
      &lt;!&ndash;<router-link :to="{name:'homeInfo',params:{userId:index}}">&ndash;&gt;
        <h3>{{ item.day }}<span>{{ item.time }}</span></h3>
        <div class="introduce-box">
          <div class="clearfix">
            <div class="img left">
              <img :src="item.src" alt="">
            </div>
            <span class="left">{{ item.name }}</span>
          </div>
          <p>{{ item.action }}</p>
        </div>
      &lt;!&ndash;</router-link>&ndash;&gt;
    </div>-->
  </div>
</template>

<script>
  import SelectTime from '@/components/template/SelectTime'
  import Info from '@/components/template/Info'
  export default {
    name: "Time",
    data() {
      return {
        introduce:[
          // {day:"2018/10/08",time:"17:42",src:require("@/assets/images/logo.png"),name:"猫"},
          // {day:"2018/10/08",time:"17:42",src:require("@/assets/images/logo.png"),name:"猫和"},
          // {day:"2018/10/08",time:"17:42",src:require("@/assets/images/logo.png"),name:"猫和老鼠"},
        ],
        Statistics:{
          leftSum:0,
          rightSum:[0,0,0]
        }
      }
    },
    created(){
      // window.location.href="https://www.cnblogs.com/jimchxi/archive/2009/03/11/1408483.html";
      // window.close()
      this.$store.commit('getActive',0)
      this.axios.get('action_times.php?type=times&token=faa7a1785e768e9826f33eab6026c255').then(res=>{
      // this.axios.get('actionOne.php?type=times&token=faa7a1785e768e9826f33eab6026c255').then(res=>{
      // this.axios.get('introduce').then(res=>{
        console.log(res.data);
        // this.introduce=res.data
        this.Statistics=res.data.Statistics
        this.introduce=res.data.introduce
    })
    },
    components:{
      SelectTime,
      Info
    },
/*    beforeRouteEnter(to, from, next) {
      console.log(to);

      if (to.params.id!='') {
        next(vm=>{
          vm.show=false;
        })
      }else {
        next(vm=>{
          vm.show=true;
        })
      }
    }*/
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
  .introduce h3 {
    margin-top: .9rem;
    font-size: .4rem;
  }
  .introduce h3>span {
    margin-left: .5rem;
  }
  .introduce-box {
    width: 100%;
    background: #fff;
    box-shadow: -10px 10px 10px rgba(0,0,0,.03);
    border: 1px solid #f3f3f3;
    padding: .35rem .35rem .5rem .35rem;
    box-sizing: border-box;
    margin-top: .4rem;
  }
  .introduce-box>div {
    height: .75rem;
    line-height: .75rem;
  }
  .introduce-box>div span {
    margin-left: .25rem;
    color: #696969;
    font-weight: bold;
    font-size: .32rem;
  }
  .introduce-box>p {
    font-size: .4rem;
    margin-top: .25rem;

  }
  .introduce-box .img {
    width: .75rem;
    height: .75rem;
  }
  .introduce-box .img img {
    width: 100%;
    border-radius: 50%;
  }
  .time-container {
    color: #696969;
    background: #fff;
    margin-bottom: .6rem;
    border: 1px solid #f3f3f3;
    box-shadow:-.12rem .12rem .1rem rgba(0,0,0,.03);
    padding: .5rem .3rem;
    box-sizing: border-box;
  }
  .time-container {
    display: table;
    width: 100%;
    text-align: center;
  }
  .time-container .left-box{
    display: table-cell;
    vertical-align: middle;
    width: 35%;
    font-size: .44rem;
  }
  .time-container .left-box p:nth-child(1) {
    font-size: .96rem;
    color: #1f1f1f;
  }
  .time-container .right-box{
    display: table-cell;
    width: 65%;
    text-align: left;
    font-size: .4rem;
  }
  .time-container .right-box li {
    line-height: 2;
    text-indent: .9rem;
  }
  .time-container .right-box li:nth-child(1) {
    background: url("../../assets/images/rader_one.gif")no-repeat;
    background-size: .6rem;
    background-position: left center;
  }
  .time-container .right-box li:nth-child(2) {
    background: url("../../assets/images/rader_five.gif")no-repeat;
    background-size: .6rem;
    background-position: left center;
  }
  .time-container .right-box li:nth-child(3) {
    background: url("../../assets/images/rader_two.gif")no-repeat;
    background-size: .6rem;
    background-position: left center;
  }
  .time-container .right-box li span{
    color: #0088ff;
    margin: 0 .1rem;
  }
  .time-container {}
  .time-container {}
</style>
