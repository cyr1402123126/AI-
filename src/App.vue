<template>
  <div id="app">
    <router-view style="margin-bottom: .6rem"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        // active: 0
      }
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
