<template>
  <van-tabbar v-model="active">
    <van-tabbar-item @click="change($event)" icon="aim">雷达</van-tabbar-item>
    <van-tabbar-item @click="change($event)" icon="chat">消息</van-tabbar-item>
    <van-tabbar-item @click="change($event)" icon="records">通讯录</van-tabbar-item>
    <van-tabbar-item @click="change($event)" icon="completed">工作</van-tabbar-item>
    <van-tabbar-item @click="change($event)" icon="contact">我</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        active: 0
      }
    },
    methods:{
      change(e){
        var active=this.active;
       /* switch (active) {
          case 0:
            this.$router.push('/time');
            break;
          /!*case 1:
            this.$router.push('/info');
            break;*!/
          case 1:
            this.$router.push('/address');
            break;
          case 2:
            this.$router.push('/work');
            break;
          case 3:
            this.$router.push('/me');
            break;
          default:
            this.$router.push('/time');
        }*/
        switch (active) {
          case 0:
            this.$router.push('/time');
            break;
          case 1:
            this.$router.push('/info');
            break;
          case 2:
            this.$router.push('/address');
            break;
          case 3:
            this.$router.push('/work');
            break;
          case 4:
            this.$router.push('/me');
            break;
          default:
            this.$router.push('/time');
        }
      },
      routerChange(){
        const router = this.$router.currentRoute.fullPath
        // console.log(router);
     /*   switch(router){
          case '/time':  this.$set(this,'active',0);break;
          case '/address':  this.$set(this,'active',1);break;
          case '/work':  this.$set(this,'active',2);break;
          case '/me':  this.$set(this,'active',3);break;
        }*/
        switch(router){
          case '/time':  this.$set(this,'active',0);break;
          case '/info':  this.$set(this,'active',1);break;
          case '/address':  this.$set(this,'active',2);break;
          case '/work':  this.$set(this,'active',3);break;
          case '/me':  this.$set(this,'active',4);break;
        }
      }
    },
    watch:{
      '$route': 'routerChange'
    }
  }
</script>

<style scoped>

</style>
