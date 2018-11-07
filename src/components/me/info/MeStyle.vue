<template>
    <div class="meStyle">
      <div class="mePoster-card">
        <MeCard :cardInfo="cardInfo"></MeCard>
        <p>名片样式</p>
        <div class="meStyle-select">
          <ul class="clearfix">
            <li><img src="@/assets/images/style_test.png" alt=""></li>
            <li><img src="@/assets/images/style_test.png" alt=""></li>
            <li><img src="@/assets/images/style_test.png" alt=""></li>
          </ul>
        </div>
      </div>
      <div class="hegiht"></div>
      <div class="meStyle-container">
        <p>名片头像</p>
        <div class="meStyle-images">
          <ul>
            <li>
              <img src="@/assets/images/test.png" alt="">
              <img src="@/assets/images/me_close.png" alt="">
            </li>
            <li>
              <img src="@/assets/images/test.png" alt="">
              <img src="@/assets/images/me_close.png" alt="">
            </li>
            <li>
              <img src="@/assets/images/test.png" alt="">
              <img src="@/assets/images/me_close.png" alt="">
            </li>
            <li>
              <img src="@/assets/images/test.png" alt="">
              <img src="@/assets/images/me_close.png" alt="">
            </li>
            <li>
              <img src="@/assets/images/test.png" alt="">
              <img src="@/assets/images/me_close.png" alt="">
            </li>
            <li>
              <img src="@/assets/images/test.png" alt="">
              <img src="@/assets/images/me_close.png" alt="">
            </li>
          </ul>
          <div class="meStyle-button">
            <van-button size="large">保存</van-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import MeCard from '@/components/template/MeCard'
  export default {
    name: "MeStyle",
    data() {
      return {
        myTag:[{text:'有两把刷子',count:'0'},{text:'互联网创业者',count:'0'},{text:'诚信至上',count:'0'},{text:'豪爽耿直',count:'0'}],
        cardInfo:{
          name:"赵雷",
          major:"视觉总监",
          company:"深圳市微冠成信息技术有限公司",
          wechat:"zhao1312541",
          phone:"13215496582",
          where:"深圳市南山区科技园创维大厦",
        }
      }
    },
    components:{
      MeCard
    },
    created() {
      this.$store.commit('getActive',4)
    }
  }
</script>

<style scoped lang="scss">
  .meStyle {
    p {
      font-size: .48rem;
      margin: .5rem 0;
    }
    .mePoster-card {
      /*width: 9.2rem;
      margin: 0 auto;
      background: #fafafa;
      height: 13rem;*/
      padding: .4rem .5rem;
      .meStyle-select {
        li {
          float: left;
          margin-right: .45rem;
          img {
            width: 2rem;
            height: 1.2rem;
          }
        }
      }
    }
    .hegiht {
      height: .2rem;
      width: 100%;
      background: #f2f2f2;
    }
    .meStyle-container {
      padding: 0rem .5rem .4rem .5rem;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        align-content: space-around;
        li {
          flex: 0 0 2.8rem;
          margin-bottom: .45rem;
          position: relative;
          img:nth-child(1) {
            width: 2.8rem;
            height: 2.8rem;
          }
          img:nth-child(2) {
            width: .5rem;
            position: absolute;
            right: -.25rem;
            top: -.25rem;
          }
        }
      }
      .meStyle-button {
        width: 100%;
        text-align: center;
      }
      .van-button--large {
        width: 96%;
        color: #fff;
        background: #3e84ff;
        border-radius: .15rem;
      }
    }
  }
</style>
