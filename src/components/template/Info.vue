<template>
  <div>
    <div class="introduce" v-for="(item,index) in introduce" :key="index">
      <!--<router-link :to="{name:'homeInfo',params:{userId:index}}">-->
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
      <!--</router-link>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "Info",
    props:['introduce'],
    data() {
      return {
      }
    },
    created() {
      console.log(this.introduce);
    }
  }
</script>

<style scoped>
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
</style>
