<template>

  <div class="card-box">
    <div class="card-top clearfix">
      <img class="left" :src="cardInfo.src" alt="">
      <div class="left card-name">
        <p>{{ cardInfo.name }} 丨{{ cardInfo.major }}</p>
        <p>{{ cardInfo.company }}</p>
      </div>
    </div>
    <div class="card-content">
      <ul>
        <li>{{ cardInfo.wechat }}</li>
        <li>{{ cardInfo.phone }}</li>
        <li>{{ cardInfo.where }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MeCard",
    data() {
      return {
/*        cardInfo:{
/!*          name:"赵雷",
          major:"视觉总监",
          company:"深圳市微冠成信息技术有限公司",
          wechat:"zhao1312541",
          phone:"13215496582",
          where:"深圳市南山区科技园创维大厦",
          src:require('@/assets/images/logo.png')*!/
          name:"",
          major:"",
          company:"",
          wechat:"",
          phone:"",
          where:"",
          src:""
        }*/
      }
    },
    props:['cardInfo']
  }
</script>

<style scoped lang="scss">
  .card-box {
    width: 100%;
    background: url("~@/assets/images/me_card.png") no-repeat;
    background-size: cover;
    background-size: 100%;
    color: #fff;
    border-radius: .15rem;
    padding: .6rem;
    box-sizing: border-box;
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0,0,0,.2);
  }
  .card-top img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
  }
  .card-top .card-name {
    margin-left: .2rem;
    margin-top: .3rem;
  }
  .card-top .card-name p:nth-child(1) {
    font-size: .42rem;
  }
  .card-top .card-name p:nth-child(2) {
    font-size: .3rem;
  }
  .card-content {
    margin-top: .3rem;
  }
  .card-content li {
    line-height: 1.8;
    background: url("~@/assets/images/me_wechat.png") no-repeat;
    background-size: .35rem;
    background-position: left center;
    padding-left: .55rem;
    font-size: .3rem;
  }
  .card-content li:nth-child(2) {
    background: url("~@/assets/images/me_phone.png") no-repeat;
    background-size: .3rem;
    background-position: left center;
  }
  .card-content li:nth-child(3) {
    background: url("~@/assets/images/me_where.png") no-repeat;
    background-size: .25rem;
    background-position: left center;
  }
</style>
