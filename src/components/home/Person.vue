<template>
  <div class="rader-container">
    <div class="title">
      <ul>
        <!--<li class="active"><router-link :to="{name:'time',params:{id:-1}}">时间</router-link></li>-->
        <li><router-link :to="{name:'time'}">天时</router-link></li>
        <li><router-link :to="{name:'behavior'}">地利</router-link></li>
        <li class="active"><router-link :to="{name:'person'}">人和</router-link></li>
      </ul>
    </div>
    <div class="rader-day">
      <SelectTime></SelectTime>
      <!--<p class="clearfix">
        7天内被查看的行为统计
        <span class="right" @click="getAlert()"><img src="@/assets/images/calendar.png" alt=""></span>
      </p>-->
      <div class="person-container">
        <ul>
          <li class="clearfix" v-for="(item,index) in Statistics" :key="index">
            <div class="left"><img :src="item.src" alt=""></div>
            <div class="left content">
              <p>{{ item.name }}</p>
              <p>跟你在名片上互动了<span>{{ item.times }}</span>次</p>
            </div>
            <div class="right">
              <p>{{ item.line }}</p>
              <p>{{ item.honor }}</p>
            </div>
          </li>
        </ul>
      </div>
      <ul>
        <li @click="change(item,$event)" v-for="item in type" :key="item.sum"><img :src="item.src" alt=""> <span>{{ item.name }}</span>跟你在名片上互动了<span>{{item.time}}</span>次<span class="span"><img
          src="@/assets/images/more_bottom.png" class="arrow" alt=""></span>
          <div class="rader-ul" v-if="item.show">
            <div class="rader-li"  v-for="value in item.look" :key="type.lasttime">
              查看了你的{{ value.type }}<span>{{ value.lasttime }}</span>次
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!--弹出框-->
    <van-dialog
      v-model="flag1"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="startTime"
        placeholder="请输入开始时间"
        type="text"
        @click="getStart()"
        readonly
      />
      <van-field
        v-model="endTime"
        type="text"
        placeholder="请输入结束时间"
        @click="getEnd()"
        readonly
      />
    </van-dialog>

    <!--时间选择器-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @confirm="confirm"
        @change="getValue" />
    </van-popup>
  </div>
</template>

<script>
  import SelectTime from '@/components/template/SelectTime'
  export default {
    name: "Person",
    data(){
      return {
        type:[
          /*{"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"11","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},
          {"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"17","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},
          {"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"17","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},
          {"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"17","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},
          {"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"17","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},
          {"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"17","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},
          {"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"17","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},
          {"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"17","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},
          {"name":"猫和老鼠","src":require('@/assets/images/logo.png'),"show":false,"time":"17","look":[{"type":"名片","lasttime":"8"},{"type":"官网","lasttime":"8"},{"type":"商城","lasttime":"8"}]},*/
        ],
        Statistics:[
         /* {"src":require("@/assets/images/logo.png"),"name":"科比","times":"75","line":"1","honor":"拔得头筹"},
          {"src":require("@/assets/images/logo.png"),"name":"科比","times":"75","line":"2","honor":"攻克堡垒"},
          {"src":require("@/assets/images/logo.png"),"name":"科比","times":"75","line":"3","honor":"成交在望"}*/
        ],
        flag:true,
        flag1:false,
        currentDate: new Date(),
        minDate: new Date(2008, 0, 1),
        currentValue:'',
        startTime: '',
        endTime: '',
        show: false,
        count:true
      }
    },
    created() {
      this.$store.commit('getActive',0)
      this.axios.get('action_person.php?type=person&token=ac2abf57d3252c2a167f2c7d103d1eeb').then(res=>{
        console.log(res.data);
        this.type=res.data.type;
        this.Statistics=res.data.Statistics;
      })
    },
    components:{
      SelectTime,
    },
    methods:{
      getAlert() {
        this.flag1=true;
      },
      change(item,e) {
        if (this.flag) {
          e.currentTarget.querySelector(".arrow").setAttribute('src',require('@/assets/images/more_top.png'));
          item.show = !item.show;
          this.flag=false;
        }else {
          e.currentTarget.querySelector(".arrow").setAttribute('src',require('@/assets/images/more_bottom.png'));
          item.show = !item.show;
          this.flag=true;
        }
      },
      beforeClose(action, done) {
        // this.startTime='';
        // this.endTime='';
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      confirm(val) {
        if (this.count) {
          this.startTime=this.currentValue.toString();
        }else {
          this.endTime=this.currentValue.toString();
        }
        this.show=false;
      },
      getStart() {
        this.show=true;
        this.count=true;
      },
      getValue(e) {
        this.currentValue=e.getValues();
        console.log(e.getValues())
      },
      getEnd() {
        this.show=true;
        this.count=false;
      }
    }
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
  .rader-day li img {
    width: 1.3rem;
    border-radius: 50%;
    margin-right: .2rem;
  }
  .rader-day>p img {
    width: .5rem;
  }
  .rader-day ul {
    border-top: 1px solid #f1f1f1;
  }
  .rader-day ul>li {
    clear: both;
    line-height: 1.8rem;
    border-bottom: 1px solid #f1f1f1;
    font-size: .4rem;
    color: #696969;
  }
  .rader-day li .span {
    float: right;
  }
  .rader-day li span {
    color: #3e84ff;
  }
  .rader-day li  span img {
    width: .5rem;
  }
  .rader-day .rader-ul {
    padding: .3rem 0;
    margin-top: 0.3rem;
    border-top: 1px solid #f1f1f1;
  }
  .rader-day .rader-li {
    line-height: 2;
  }
  .rader-li span {
    margin: 0 .2rem;
  }
  .person-container {
    color: #696969;
    background: #fff;
    margin-bottom: .6rem;
    border: 1px solid #f3f3f3;
    box-shadow:-.12rem .12rem .1rem rgba(0,0,0,.03);
    padding: .5rem .3rem;
    box-sizing: border-box;
  }
  .person-container ul {
    border: none;
  }
  .person-container ul>li {
    border: none;
    line-height: 1.5;
    margin-bottom: .6rem;
  }
  .person-container ul>li:last-child {
    margin-bottom:.1rem;
  }
  .person-container li .right {
    text-align: center;
    font-size: .32rem;
    line-height: .7rem;
  }
  .person-container li .right p:nth-child(1) {
    color: #f39800;
    font-size: .72rem;
  }
  .person-container li .content {
    font-size: .38rem;
  }
  .person-container li .content p:nth-child(1) {
    color: #3e84ff;
    font-size: .42rem;
  }
  .person-container li .content span{
    margin: 0 .1rem;
    font-size: .41rem;
  }
</style>
