<template>
    <div class="mePoster">
      <div class="mePoster-card">
        <MeCard :cardInfo="cardInfo"></MeCard>
        <div class="card-code">
          <img src="@/assets/images/me_code.png" alt="">
          <img class="card-share" :src="src" alt="">
        </div>
      </div>
      <!--<div class="mePoster-footer">
        <van-button size="large">保存名片海报</van-button>
      </div>-->
    </div>
</template>

<script>
  import MeCard from '@/components/template/MeCard'
  export default {
    name: "MePoster",
    data() {
      return {
        cardInfo:{
          name:"",
          major:"",
          company:"",
          wechat:"",
          phone:"",
          where:"",
          "src":""
        },
        src:''
      }
    },
    components:{
      MeCard
    },
    created() {
      this.axios.get('https://mp.wedotop.com/Api/card.php?type=card&token=fd51130bbed844e007c6a8e252312869')
      // this.axios.get('mePoster')
        .then(res=>{
          this.cardInfo=res.data[0].cardInfo;
          this.src=res.data[0].qrcode;
        })
    }
  }
</script>

<style scoped lang="scss">
  .mePoster {
    /*background: #f4f4f4;*/
    padding: .4rem .5rem;
    .mePoster-card {
      width: 9.2rem;
      margin: 0 auto;
      background: #fafafa;
      height: 13rem;
    }
  }
  .card-box {
    width: 100%;
    background: url("~@/assets/images/me_card.png") no-repeat;
    background-size: cover;
    background-size: 100%;
    color: #fff;
    border-radius: .15rem;
    padding: .6rem;
    box-sizing: border-box;
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
  .card-code {
    text-align: center;
    background: #fafafa;
    position: relative;
  }
  .card-code img {
    width: 4.6rem;
    margin: 1rem auto;
  }
  img.card-share {
    width: 3.35rem;
    position: absolute;
    left: 33%;
    top: 10%;
    border-radius: 50%;
  }
  .van-button--default {
    background: #3e84ff;
    color: #fff;
    border-radius: .12rem;
    margin-top: .5rem;
  }
</style>
