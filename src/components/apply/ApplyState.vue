<template>
    <div class="applyState">
      <div class="applyState-content clearfix" v-for="(item,index) in state" :key="index">
        <div class="person" v-if="item.type==2">
          <div class="left">
            <img :src="item.avatarImg" alt="">
          </div>
          <div class="applyState-cicle">
            <h3>{{ item.firstName }}</h3>
            <p>{{ item.desc }}</p>
            <div class="applyState-images">
              <img  v-for="(value,index) in item.praiseImg" :key="index" :src="value" alt="">
            </div>
            <div class="applyState-time clearfix">
              <span class="left">{{ item.movingTime }}</span>
              <img class="right" src="@/assets/images/info_alert.png" alt="">
            </div>
            <div class="applyState-box">
              <div class="applyState-love clearfix">
                <img src="@/assets/images/love_cicle.png" alt="">
                <span v-for="(value,index) in item.praiseName" :key="index">{{ value }}</span>
              </div>
              <ul>
                <li v-for="(val,index) in item.commentCont" :key="index">{{ val.name }}:<span>{{ val.cont }}</span></li>
              </ul>
              <div class="triangle-up"></div>
            </div>
          </div>
        </div>
        <div class="company" v-if="item.type==1">
          <div class="left">
            <img :src="item.avatarImg" alt="">
          </div>
          <div class="applyState-cicle">
            <h3>{{ item.firstName }}</h3>
            <p>{{ item.desc }}</p>
            <div class="applyState-images clearfix spacily-gray">
              <div class="left spacily-small">
                <img :src="item.companyImg" alt="">
              </div>
              <p class="left">{{ item.content }}</p>
            </div>
            <div class="applyState-time clearfix">
              <span class="left">{{ item.movingTime }}</span>
              <img class="right" src="@/assets/images/info_alert.png" alt="">
            </div>
            <div class="applyState-box">
              <div class="applyState-love clearfix">
                <img src="@/assets/images/love_cicle.png" alt="">
                <span v-for="(value,index) in item.praiseName" :key="index">{{ value }}</span>
              </div>
              <ul>
                <li v-for="(val,index) in item.commentCont" :key="index">{{ val.name }}:<span>{{ val.cont }}</span></li>
              </ul>
              <div class="triangle-up"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "ApplyState",
    data() {
      return {
        state:[
          // {avatarImg:require("@/assets/images/logo.png"),firstName:"龙虾下",movingTime:"昨天",desc:"哈哈哈哈",praiseImg:[require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png'),require('@/assets/images/test.png')],praiseName:["陈鸿真","陈鸿真"],commentCont:[{name:"陈鸿真",cont:"厉害了我的哥"},{name:"陈鸿真",cont:"厉害了我的哥"},{name:"陈鸿真",cont:"厉害了我的哥"}],type:2},
          // {avatarImg:require("@/assets/images/logo.png"),firstName:"龙虾下",movingTime:"昨天",desc:"哈哈哈哈",companyImg:require('@/assets/images/test.png'),praiseName:["陈鸿真","陈鸿真"],commentCont:[{name:"陈鸿真",cont:"厉害了我的哥"},{name:"陈鸿真",cont:"厉害了我的哥"},{name:"陈鸿真",cont:"厉害了我的哥"}],content:'445454554544554545',type:1},
          // {avatarImg:require("@/assets/images/logo.png"),firstName:"龙虾下",movingTime:"昨天",desc:"哈哈哈哈",content:'445454554544554545',type:1},
        ]
      }
    },
    created() {
      let company_id=this.getCookie('company_id');
      this.axios.post('https://mp.wedotop.com/program/dynamic.php',{
        token : "c6187f4d45daabad829dabf49f167502",
        type : "dynamic",
        category : "list",
        company_id : 1
      }).then(res=>{
        this.state=res.data;
        console.log(res.data);

        // console.log(res.data.avatrImg);
        // this.state=res.data
      })
    }
  }
</script>

<style scoped>
  .applyState {
    padding: 0rem .5rem;
  }
  .applyState-content {
    padding: .5rem 0 .6rem 0;
    /*border-bottom: 1px solid #e5e5e5;*/
  }
  .person,.company {
    border-bottom: 1px solid #e5e5e5;
    padding: .6rem 0;
  }
  .person>.left,.company>.left {
    width: 1.25rem;
  }
  .spacily-small img {
    width: 1.25rem!important;
    height: auto!important;
  }
  .applyState-content .images-small img {
    border-radius: 50%;
  }
  .applyState-cicle {
    overflow: hidden;
    margin-left: 1.5rem;
  }
  .applyState-cicle .applyState-images img {
    width: 2.3rem;
    height: 2.3rem;
    margin: .12rem .12rem .12rem 0;

  }
  h3 {
    color: #61739b;
    font-size: .42rem;
  }
  p,span,li {
    line-height: 1.7;
    font-size: 0.38rem;
  }
  p {
    line-height: 2;
  }
  .applyState-time {
    margin-top: .15rem;
  }
  .applyState-time img {
    width: .55rem;
    margin-right: .2rem;
  }
  .applyState-box  {
    width: 100%;
    background: #f3f3f5;
    margin-top: .3rem;
    position: relative;
    padding:.15rem .3rem .2rem 0;
  }
  .applyState-love {
    padding-bottom: .10rem;
    border-bottom: 1px solid #e5e5e5;
    padding-left: .35rem;
  }
  .applyState-box ul {
    padding-left: .35rem;
    padding-top: .1rem;
  }
  .applyState-box .applyState-love img {
    width: .35rem;
  }
  .applyState-box .applyState-love>span {
    margin-left: .1rem;
    color: #919192;
  }
  .applyState-box ul li {
    color: #516692;
  }
  .applyState-box ul li>span {
    color: #4a4a4a;
  }
  .triangle-up {
    position: absolute;
    left: .5rem;
    top: -.15rem;
    width: 0;
    height: 0;
    border-left: .2rem solid transparent;
    border-right: .2rem solid transparent;
    border-bottom: .2rem solid #f3f3f5;
  }
  .spacily-gray {
    background: #c5c5c5;
    padding-left: .1rem;
    box-sizing: border-box;
  }
  .spacily-gray p {
    margin-top: .45rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 70%;
  }
</style>
