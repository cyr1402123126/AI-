<template>
    <div class="work">
      <div class="work-header">
        <div class="header-top">
          <p>昨日关键数据（{{ data.time }}）</p>
          <div class="header-wraper">
            <div class="wraper-top">
              <div class="left">
                <p>活跃用户</p>
                <span>{{ data.username }}</span>
              </div>
              <div class="right">
                <p>新增客户</p>
                <span>{{ data.customer }}</span>
              </div>
            </div>
            <div class="wraper-top">
              <div class="left">
                <p>名片浏览</p>
                <span>{{ data.watch }}</span>
              </div>
              <div class="right">
                <p>被转发次数</p>
                <span>{{ data.share }}</span>
              </div>
            </div>
            <div class="wraper-bottom">
              <router-link :to="{name:'applyAI'}">
                <van-cell-group>
                  <van-cell title="详细数据" is-link />
                </van-cell-group>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="work-container">
       <!-- <div class="work-task">
          <ul>
            <li class="clearfix">
              <img src="@/assets/images/work_task.png" alt="">
              <div class="left">
                <p>任务</p>
                <p>高效管理自己的销售计划</p>
              </div>
            </li>
            <li class="clearfix">
              <img src="@/assets/images/work_change.png" alt="">
              <div class="left">
                <p>商机</p>
                <p>把握机会成交就在眼前</p>
              </div>
            </li>
          </ul>
        </div>-->
        <div class="work-apply">
          <h3>我的应用</h3>
          <ul>
            <li v-for="(item,index) in apply" :key="index" @click="noData(index)">
              <router-link :to="{name:item.route}">
                <p><img :src="item.src" alt=""></p>
                <span>{{ item.detail }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import { Dialog } from 'vant';
  export default {
    name: "Work",
    data() {
      return {
        apply:[
          {src:require('@/assets/images/work_shop.png'),detail:'商城',route:"work"},
          {src:require('@/assets/images/work_new.png'),detail:'名片日报',route:"applyCard"},
          {src:require('@/assets/images/work_direction.png'),detail:'动态',route:"applyState"},
          {src:require('@/assets/images/work_form.png'),detail:'客户表单',route:"work"},
          {src:require('@/assets/images/work_all.png'),detail:'AI报表',route:"applyAI"},
          {src:require('@/assets/images/work_data.png'),detail:'访问排行',route:"applyLine"},
          {src:require('@/assets/images/work_adver.png'),detail:'系统公告',route:"work"},
        ],
        data:{
           username:'',
           customer:'',
           watch:'',
           share:'',
           time:''
        },
      }
    },
    methods:{
      noData(index) {
        if (index == 0 || index == 3 || index == 6) {
          Dialog.alert({
            message: '暂无数据'
          }).then(() => {
            this.$router.push('/work')
            // on close
          });
        }
      },
    },
    created() {
      this.$store.commit('getActive',3)
      this.axios.get('work.php?type=work&token=9aaed6a7b5d34ee670804d8a69c093f6').then(res=>{
      // this.axios.get('work').then(res=>{
        this.data=res.data[0];
      })
    }
  }
</script>

<style scoped>
  .header-top {
    height: 3rem;
    width: 100%;
    background: #3e84ff;
    border-bottom-left-radius: 30%;
    border-bottom-right-radius: 30%;
    padding-top: .5rem;

  }
  .header-top>p {
    color: #fff;
    font-size: .51rem;
    margin-left: .75rem;
    margin-bottom: .45rem;
  }
  .header-wraper {
    width: 9.7rem;
    background: #fff;
    margin: 0 auto;
    box-shadow: .02rem .08rem .18rem rgba(0,0,0,0.18);
    box-sizing: border-box;
    border-radius: .15rem;
    padding-top: .6rem;
  }
  .header-wraper .wraper-top {
    text-align: center;
    height: 2rem;
  }
  .wraper-top:nth-child(2) {
    border-bottom: 1px solid #e5e5e5;
  }
  .wraper-top .left {
    width: 50%;
  }
  .wraper-top .right {
    width: 50%;
  }
  .header-wraper .wraper-top p {
    color: #999999;
    line-height: 2;
    font-size: .39rem;
  }
  .header-wraper .wraper-top span {
    font-size: .51rem;
  }
  .van-cell {
    color: #3e84ff;
  }
  [class*=van-hairline]::after {
    border: 0 solid #eee;
  }
  .work-container {
    margin-top: 4.5rem;
    padding: 0 .75rem;
  }
  .work-task img {
    width: 1.1rem;
    float: left;
  }
  .work-task .left:nth-child(2) {
    margin-left: .35rem;
  }
  .work-task .left:nth-child(2) p:nth-child(1) {
    font-size: .48rem;
    line-height: 1.4;
  }
  .work-task .left:nth-child(2) p:nth-child(2) {
    font-size: .36rem;
    color: #888888;
    line-height: 1.4;
  }
  .work-task li {
    padding: .45rem 0;
  }
  .work-task li:nth-child(1) {
    border-bottom: 1px solid #e5e5e5;
  }
  .work-apply h3 {
    font-size: .48rem;
    margin: .25rem 0 .45rem 0;
    font-weight: normal;
  }
  .work-apply img {
    width: 1.4rem;
  }
  .work-apply li {
    width: 1.7rem;
    text-align: center;
    float: left;
    margin-right: .83rem;
  }
  .work-apply li span {
    font-size: .41rem;
    color: #818080;
    line-height: 3;
  }
  .work-apply li:nth-child(4n) {
    margin-right: 0;
  }
  .work-apply ul {
    height: 5.5rem;
  }
</style>
