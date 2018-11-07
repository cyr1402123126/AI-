<template>
  <div class="myCard">
    <div class="myCard-top">
      <mycardInfo :cardInfo="cardInfo"></mycardInfo>
    </div>
    <div class="height"></div>
    <div class="myCard-conrainer">
      <h3>我的个人简介</h3>
      <p>{{ intro }}</p>
    </div>
    <div class="height"></div>
    <img src="@/assets/images/person_test.png" alt="">
    <div class="height"></div>
    <div class="myCard-top">
      <div class="publicTag">
        <span class="tag" v-for="(item,index) of myTag" :key="index">
            {{item}}
          </span>
      </div>
    </div>
    <div class="height"></div>
    <img src="@/assets/images/person_vedio.png" alt="">
    <div class="height"></div>
    <div class="myCard-conrainer">
      <h3>我的个人简介</h3>
      <ul>
        <li v-for="(item,index) in myImages" :key="index"><img v-lazy="item" alt=""></li>
      </ul>
    </div>
    <div class="myCard-bottom">
      <router-link to="/me/list">
        <div class="button">编辑我的名片</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import mycardInfo from '@/components/template/MeCard'
  export default {
    name: "myCard",
    data() {
      return {
        intro:'',
        myTag:[],
        cardInfo:{
          name:"",
          major:"",
          company:"",
          wechat:"",
          phone:"",
          where:"",
        },
        myImages:[]
      }
    },
    components:{
      mycardInfo,
    },
    created() {
      this.$store.commit('getActive',4)
      this.axios.get('card.php?type=card&token=fd51130bbed844e007c6a8e252312869').then(res=>{
      // this.axios.get('info').then(res=>{
        // let code=res.data
        console.log(res.data[0]);
        this.intro=res.data[0].intro;
        this.myTag=res.data[0].myTag;
        this.cardInfo=res.data[0].cardInfo;
        this.myImages=res.data[0].myImages;
        // console.log(res.data[0].myTag);
      })
    }
  }
</script>

<style scoped lang="scss">
  .myCard-top {
    padding: .4rem .5rem;
  }
  .height {
    width: 100%;
    height: .25rem;
    background: #f2f2f2;
  }
  .myCard-conrainer {
    padding: .4rem .5rem;
    h3 {
      font-size: .42rem;
      font-weight: normal;
      margin-bottom: .2rem;
    }
    p {
      text-indent: .6rem;
      font-size: .38rem;
      text-align: justify;
      color: #888888;
      line-height: 1.5;
    }
    li {
      margin-bottom: .45rem;
    }
  }
  span.tag{
    display: inline-block;
    position: relative;
    margin-top: .3rem;
    margin-right: .35rem;
    padding: .3rem .45rem .3rem .8rem;
    background: #E2ECF8;
    color: #1D7AE8;
    border-radius: 5px;
    span.close{
      position: absolute;
      right: -.15rem;
      top: -.15rem;
      width: .42rem;
      height: .42rem;
      line-height: .32rem;
      background: rgb(102,102,102);
      text-align: center;
      color: #ffffff;
      border-radius: 50%;
    }
  }
  .myCard-bottom {
    width: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 999;
    text-align: center;
    display: table-cell;
    box-shadow: 0px -2px 5px rgba(0,0,0,.04);
    .button {
      width: 4.04rem;
      height: 1rem;
      line-height: 1rem;
      border-radius: .5rem;
      border: 1px solid #4287f2;
      color: #4287f2;
      margin: 0 auto;
      text-align: center;
      display: inline-block;
    }
  }
</style>
