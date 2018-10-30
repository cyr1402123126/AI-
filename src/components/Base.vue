<template>
  <div>
    <Footer></Footer>
    <transition name="Opacity" mode="out-in">
      <keep-alive>
        <router-view style="margin-bottom: 60px"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import Footer from '@/components/template/Footer'
  export default {
    name: "Base",
    components:{
      Footer
    }
  }
</script>

<style scoped>
  .van-tabbar-item__text {
    font-size: .36rem;
    margin-top: .1rem;
  }
  .van-icon {
    font-size: .55rem;
  }
  .Opacity-enter-active,.Opacity-leave-active {
    transition: opacity .05s;
  }
  .Opacity-enter,.Opacity-leave-to {
    opacity: 0;
  }
</style>
