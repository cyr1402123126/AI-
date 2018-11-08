<template>
  <van-tabbar v-model="active">
    <van-tabbar-item @click="change($event)">
      <span>雷达</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active : icon.normal"
      >
    </van-tabbar-item>
    <van-tabbar-item @click="change($event)">
      <span>消息</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active1 : icon.normal1"
      >
    </van-tabbar-item>
    <van-tabbar-item @click="change($event)">
      <span>通讯录</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active2 : icon.normal2"
      >
    </van-tabbar-item>
    <van-tabbar-item @click="change($event)">
      <span>工作</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active3 : icon.normal3"
      >
    </van-tabbar-item>
    <van-tabbar-item @click="change($event)">
      <span>我</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active4 : icon.normal4"
      >
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        active: 0,
          icon: {
            normal: require('@/assets/images/rader.png'),
            active: require('@/assets/images/rader_active.png'),
            normal1: require('@/assets/images/info.png'),
            active1: require('@/assets/images/info_active.png'),
            normal2: require('@/assets/images/address.png'),
            active2: require('@/assets/images/address_active.png'),
            normal3: require('@/assets/images/work.png'),
            active3: require('@/assets/images/work_active.png'),
            normal4: require('@/assets/images/me.png'),
            active4: require('@/assets/images/me_active.png')
          }
        }
    },
    mounted() {
      this.active=this.$store.state.active
    },
    methods:{
      change(e){
        var active=this.active;
        this.$store.commit('getActive',this.active)
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
  .van-tabbar-item__icon img {
    height: 18px;
    display: block;
    width: .55rem;
  }
</style>
