<template>
    <div class="info">
      <vue-better-scroll
        style="height:83vh;"
        class="wrapper"
        ref="scroll"
        :scrollbar="scrollbarObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pullingUp="onPullingUp">
        <!--内容-->
        <ul>
          <router-link :to="{name:'chat',params:{staff_id:item.staff_id,customer_id:item.customer_id}}" tag="li" v-for="(item,index) in info" :key="index">
            <div class="left"><img :src="item.src" alt=""></div>
            <div class="left info-name">
              <p>{{ item.name }}</p>
              <p>{{ item.content }}</p>
            </div>
            <div class="right">{{ item.time }}</div>
          </router-link>
        </ul>
      </vue-better-scroll>
    </div>
</template>

<script>
  import VueBetterScroll from 'vue2-better-scroll'
  let count = 1;
  export default {
    name: "Info",
    data() {
      return {
        info:[
        /*  {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},*/
        ],

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
      this.$store.commit('getActive',1)
      let staff_id=this.getCookie('staff_id');
      this.axios.get('message.php?type=message&token=d09abebb9f5a9ec1dc6f16d55559154a')
        .then(res=>{
        console.log(res.data);
        this.info=res.data;
        this.$store.commit('getStaff_id',res.data.staff_id);
        this.$store.commit('getCustomer_id',res.data.customer_id);
      })
    },
    components: {
      VueBetterScroll
    },
    methods: {
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
            this.axios.post('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c',{
              page:count
            }).then(res=>{
              console.log(res.data.data);
              let length=res.data.length;
              if (length == 0) {
                this.$toast('无更多数据')
              }
              for (let i = 0; i < length; i++) {
                this.info.push(res.data[i])
              }
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
 .info {
   padding: .4rem .5rem;
 }
 .left>img {
   float: left;
   width: 1.45rem;
 }
  .info li {
    height: 1.9rem;
    line-height: 1.9rem;
    border-bottom: 1px solid #eee;
    clear: both;
    padding-top: .2rem;
    box-sizing: border-box;
  }
  .info .info-name,.right {
    margin-top: .1rem;
    line-height: normal;
  }
 .info .info-name p:nth-child(1) {
   color: #333;
 }
 .info .info-name p:nth-child(2) {
   color: #979797;
 }
 .info li p {
   font-size: .42rem;
   margin-left: .3rem;
 }
  .info .right {
    font-size: .33rem;
    color: #c2bfbf;
  }
</style>
