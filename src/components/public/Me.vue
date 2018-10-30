<template>
  <div>
    <div class="me-container">
      <div class="me-header">
          <div class="left">
            <img :src="info.src" alt="" @click="alertImage">
          </div>
          <router-link to='/me/card'>
          <div class="left me-info">
            <p>{{ info.name }}</p>
            <p>{{ info.position }}</p>
            <p>{{ info.company_name }}</p>
          </div>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </router-link>
      </div>
    </div>
    <div class="height"></div>
    <div class="me-content">
      <ul>
        <li v-for="(item,index) in setting" :key="index">
          <router-link :to="{name:item.router}">
            <img :src="item.src" alt="">
            <p> {{ item.content }} </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  export default {
    name: "Me",
    data() {
      return {
        setting:[
          {src:require('@/assets/images/me_myself.png'),content:'我的动态',router:"myself"},
          // {src:require('@/assets/images/me_talk.png'),content:'话术管理',router:"me"},
          {src:require('@/assets/images/me_use.png'),content:'使用教程',router:"me"},
          {src:require('@/assets/images/me_ques.png'),content:'意见反馈',router:"suggest"},
          {src:require('@/assets/images/me_setting.png'),content:'设置',router:"me"},
        ],
        info:{
          src:'',
          name:"",
          position:"",
          company_name:""
        },
        image:'',
      }
    },
    methods:{
      alertImage() {
        ImagePreview({
          images: [
            this.image
          ],
          showIndex: false
        });
      }
    },
    created() {
      this.axios.get('me.php?type=me&token=93981fd7cbba909dcc92363173af8a17').then(res=>{
      // this.axios.get('me').then(res=>{
        this.info=res.data[0];
        this.image=res.data[0].src;
        this.setCookie('company_id',res.data[0].company_id);
        this.setCookie('staff_id',res.data[0].staff_id);
      })
    }
  }
</script>

<style scoped>
  .me-container {
    padding:.9rem .5rem 0 .5rem;
  }
  .me-content {
    padding:0 .5rem;
  }
  .me-header {
    height: 2.6rem;
  }
  .me-header .left:not(.me-info) {
    width: 2rem;
  }
  .me-header .left img {
    border-radius: .2rem;
  }
  .me-info p {
    font-size: .35rem;
    line-height: 1.4;
  }
  .me-info p:nth-child(1) {
    font-size: .48rem;
    margin-bottom: .2rem;
  }
  .me-info {
    margin-left: .4rem;
    margin-top: .1rem;
    width: 6rem;
  }
  .me-header .right {
    margin-top: .7rem;
  }
  .height {
    height: .15rem;
    width: 100%;
    background: #f2f2f2;
  }
  .me-content {

  }
  .me-content li{
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid #efefef;
  }
  .me-content li img {
    width: .8rem;
  }
  .me-content li p {
    margin-left: .35rem;
    display: inline-block;
  }
</style>
