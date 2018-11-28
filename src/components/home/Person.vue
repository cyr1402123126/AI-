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
      <vue-better-scroll
        style="height:76vh;"
        class="wrapper"
        ref="scroll"
        :scrollbar="scrollbarObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pullingUp="onPullingUp">
        <!--<SelectTime></SelectTime>-->
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
                <p>跟你在名片上互动了<span>{{ item.time }}</span>次</p>
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
              <router-link :to="{name:'customerInfo',params:{id:item.customer_id}}">
                <div class="rader-li"  v-for="value in item.look" :key="type.lasttime">
                  查看了你的{{ value.type }}<span>{{ value.lasttime }}</span>次
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </vue-better-scroll>
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
  import VueBetterScroll from 'vue2-better-scroll'
  let count = 1;
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
        count:true,

        // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        scrollbarObj: {
          fade: true
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: ' ',
            noMore: '没有更多数据了'
          }
        },
        startY: 0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        items: []
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
      VueBetterScroll
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
      },
      // 滚动到页面顶部
      scrollTo () {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      // 模拟数据请求
      getData () {
        return new Promise(resolve => {
          setTimeout(() => {
            const arr = [];
            count++;
            console.log(count);
            this.axios.post('action_person.php?type=person&token=ac2abf57d3252c2a167f2c7d103d1eeb',{
              page:count
            }).then(res=>{
              console.log(res.data.type);
              console.log(res.data.length);
              let length=res.data.type.length;
              if (res.data.type.length == 0) {
                this.$toast('无更多数据')
              }
              for (let i = 0; i < length; i++) {
                this.type.push(res.data.type[i])
              }
              // console.log(this.introduce);
              resolve(arr)
            })
          }, 1000)
        })
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        this.getData().then(res => {
          this.items = this.items.concat(res)
          if(count<50){
            this.$refs.scroll.forceUpdate(true)
          }else{
            this.$refs.scroll.forceUpdate(false)
          }
        })
      },
    }
  }
</script>

<style scoped>
  .rader-container {
    padding: .0rem .5rem;
  }
  .rader-container .title {
    width: 91%;
    height: 1.7rem;
    line-height: 1rem;
    background: #fff;
    position: fixed;
    z-index: 2;
    top: 0;
  }
  .rader-container .title ul {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding-top: .4rem;
    background: #fff;
    margin-bottom: -.24rem;
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
    margin-top: 2rem;
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
