<template>
    <div class="myself">
      <div class="myself-top clearfix">
        <div class="left myself-img">
          <img :src="info.src" alt="">
        </div>
        <div class="left top-content">
          <div class="myself-name clearfix"><span class="left">{{ info.name }} | {{info.major  }} </span></div>
          <p>{{ info.company }}</p>
        </div>
      </div>
      <div class="myself-container">
        <ul>
          <li class="clearfix" v-for="(item,index) in myself" :key="index">
            <router-link :to="{name:'self',params:{id:item.id}}">
              <!--<router-link to="/work/state">-->
              <div class="left myself-time"><span>{{ item.day }}</span>{{ item.month }}月</div>
              <div class="left myself-image">
                <img :src="item.src" alt="">
              </div>
              <!--{{item.src}}-->
              <div class="left myself-meet">
                <p>{{ item.content }}</p>
                <p>共{{ item.sum }}张</p>
              </div>
              <div class="right">
                <div>
                  <img src="@/assets/images/love.png" alt="">
                  <span>{{ item.loveSum }}</span>
                  <img src="@/assets/images/dialog.png" alt="">
                  <span class="right-data">{{ item.dialogSum }}</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
      <div tag="div" to="" class="issue" @click="onRead">
        <!--照片上传-->

        <div>
          <img src="@/assets/images/camera.png" alt="发布" title="发布">
        </div>
    <!--    <van-uploader multiple @click="onRead">
          <img src="@/assets/images/camera.png" alt="发布" title="发布">
        </van-uploader>-->
      </div>
    </div>
</template>

<script>
  export default {
    name: "Myself",
    data() {
      return {
        info:{
          src:'',
          name:"",
          major:"",
          company:"",
          image:''
        },
        myself:[],
       /* myself:[
          {"year":"07","month":"10","day":"","src":"http://39.108.86.5/addons/images/test.png","sum":1,"content":"深圳市微冠成信息技术有限公司是一家以移动互联网营销为核心的系统解决方案服务提供商。公司紧跟时代发展的步伐，在移动互联网的时代，微冠成致力于将线下销售终端与线上营销完美结合，实现企业向移动互联网转型升级的愿景和目标。","loveSum":5,"dialogSum":1},
          {"year":"07","month":"10","day":"","src":"http://39.108.86.5/addons/images/test.png","sum":1,"content":"遇见","loveSum":5,"dialogSum":1},
          {"year":"07","month":"10","day":"","src":"http://39.108.86.5/addons/images/test.png","sum":1,"content":"遇见","loveSum":5,"dialogSum":1},
          {"year":"07","month":"10","day":"","src":"http://39.108.86.5/addons/images/test.png","sum":1,"content":"遇见","loveSum":5,"dialogSum":1},
          {"year":"07","month":"10","day":"","src":"http://39.108.86.5/addons/images/test.png","sum":1,"content":"遇见","loveSum":5,"dialogSum":1},
          {"year":"07","month":"10","day":"","src":"http://39.108.86.5/addons/images/test.png","sum":1,"content":"遇见","loveSum":5,"dialogSum":1}
        ]*/
      }
    },
    created() {
      //线上环境
      let staff_id=this.getCookie('staff_id');
      this.axios.post('dynamic.php',{
          token : "c6187f4d45daabad829dabf49f167502",
          type : "dynamic",
          staff_id : staff_id
      }).then(res=>{
        console.log(res.data);
        this.info=res.data.myself.info;
        this.myself=res.data.myself.myself;
      })

      //本地测试
      /*this.axios.get('myself').then(res=>{
        console.log(res.data);
        this.info=res.data.info;
        this.myself=res.data.myself;
      })*/
    },
    methods:{
      onRead(){
        this.$router.push({ path: '/work/edit'});
      }
    }
  }
</script>

<style scoped lang="scss">
  ul {
    margin-bottom: 3rem;
  }
  .myself {
    padding: .4rem .5rem;
  }
  .myself-top {
    box-shadow: .05rem .05rem .1rem rgba(0,0,0,.15);
    padding: .65rem;
  }
  .myself-top .myself-img{
    width: 1.8rem;
  }
  .myself-top .myself-img img{
    border-radius: 50%;
  }
  .myself-top .myself-name{
    text-align: right;
    font-size: .42rem;
  }
  .myself-top .myself-name img{
    width: .6rem;
  }
  .top-content {
    margin-left: .3rem;
    margin-top: .2rem;
    font-size: .38rem;
  }
  .top-content p {
    line-height: 3;
  }
  .myself-container {
    width: 100%;
    height: 2.2rem;
    margin-top: .9rem;
  }
  .myself-container ul{

  }
  .myself-container ul li{
    margin-bottom: .8rem;
  }
  .myself-container li .myself-time{
    font-size: .4rem;
    margin-right: .65rem;
  }
  .myself-container li .myself-time span{
    font-size: .8rem;
  }
  .myself-container li .myself-image{
    width: 2.2rem;
    height: 2.2rem;
  }
  .myself-container li .myself-image img {
    width: 2.2rem;
    height: 2.2rem;
  }
  .myself-container li .myself-meet{
    margin-left: .2rem;
    height: 2.2rem;
    position: relative;
    width: 1rem;
  }
  .myself-container li .myself-meet p:nth-child(1){
    position: absolute;
    top: .02rem;
    left: 0;
    font-size: .42rem;
    width: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: .1rem;
  }
  .myself-container li .myself-meet p:nth-child(2){
    position: absolute;
    bottom: .02rem;
    left: 0;
    font-size: .36rem;
  }
  .myself-container li .right {
    height: 2.2rem;
    position: relative;
    width: 2.5rem;
    text-align: right;
  }
  .myself-container li .right>div {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .myself-container li .right span {
    margin: 0 .2rem 0 .1rem;
  }
  .myself-container li .right .right-data {
    margin-right: 0;
  }
  .myself-container li .right img{
    width: .4rem;
  }
  div.issue{
    position: fixed;
    right: .34rem;
    bottom: 5.4rem;
    width: 1.46rem;
    line-height: 1.46rem;
    background: #fffeff;
    border: 1px solid #dadada;
    border-radius: 50%;
    text-align: center;
    img{
      width: .83rem;
      height: .83rem;
    }
  }
</style>
