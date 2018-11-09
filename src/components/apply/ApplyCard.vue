<template>
    <div class="applyCard">
      <div class="apply-title clearfix">
        <div class="left">
          <h3>我的名片日报</h3>
          <div class="applyCard-fixed" @click="updateTime">
            <input type="text" readonly :value="myPaper.time">
            <div class="triange-bottom"></div>
          </div>
          <!--<span>{{ myPaper.time }}</span>-->
        </div>
        <div class="right">
          <img :src="myPaper.src" alt="">
        </div>
      </div>
      <div class="apply-boldLine"></div>
      <div class="apply-Line"></div>
      <div class="card-content">
        <div class="card-top">
          <span class="biao"></span>
          <span>名片数据</span>
        </div>
        <div>
          <div class="card-add clearfix">
            <div class="left">
              <p>新增客户数</p>
              <p>{{ myPaper.data.customer.sum }}</p>
              <p>{{ myPaper.data.customer.state }}</p>
            </div>
            <div class="left">
              <p>活跃客户</p>
              <p>{{ myPaper.data.active.sum }}</p>
              <p>{{ myPaper.data.active.state }}</p>
            </div>
          </div>
          <div class="card-add clearfix">
            <div class="left">
              <p>名片浏览数</p>
              <p>{{ myPaper.data.see.sum }}</p>
              <p>{{ myPaper.data.see.state }}</p>
            </div>
            <div class="left">
              <p>活跃客户</p>
              <p>{{ myPaper.data.share.sum }}</p>
              <p>{{ myPaper.data.share.state }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="card-top">
          <span class="biao"></span>
          <span>商城</span>
        </div>
        <div>
          <div class="card-add clearfix">
            <div class="left">
              <p>访客数</p>
              <p>{{ myPaper.shop.customer.sum }}</p>
              <p>{{ myPaper.shop.customer.state }}</p>
            </div>
            <div class="left">
              <p>订单数</p>
              <p>{{ myPaper.shop.order.sum }}</p>
              <p>{{ myPaper.shop.order.state }}</p>
            </div>
          </div>
          <div class="card-add clearfix">
            <div class="left">
              <p>转化率</p>
              <p>{{ myPaper.shop.change.sum }}</p>
              <p>{{ myPaper.shop.change.state }}</p>
            </div>
            <div class="left">
              <p>成交额/元</p>
              <p>{{ myPaper.shop.money.sum }}</p>
              <p>{{ myPaper.shop.money.state }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="card-top">
          <span class="biao"></span>
          <span>商机</span>
        </div>
        <div class="fixPosition">
          <img src="@/assets/images/applyCard_change.png" alt="">
          <span class="change-one">{{ myPaper.change.customer }}</span>
          <span class="change-two">{{ myPaper.change.project }}</span>
          <span class="change-three">{{ myPaper.change.success }}</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-top">
          <span class="biao"></span>
          <span>任务</span>
        </div>
        <div class="card-add clearfix">
          <div class="left">
            <p>创建任务</p>
            <p>{{ myPaper.rank.make }}</p>
          </div>
          <div class="left">
            <p>完成任务</p>
            <p>{{ myPaper.rank.success }}</p>
          </div>
        </div>
      </div>

      <!--选择器-->
      <van-popup v-model="show" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :max-date="maxDate"
          @confirm="confirm"
          @change="change"
        />
      </van-popup>
    </div>
</template>

<script>
  export default {
    name: "ApplyCard",
    data() {
      return {
        myPaper:{
          time:"2018-10-12",
          src:require("@/assets/images/logo.png"),
          data:{customer:{sum:0,state:"无对比"},active:{sum:2,state:"无对比"},see:{sum:0,state:"无对比"},share:{sum:0,state:"无对比"}},
          shop:{customer:{sum:3,state:"无对比"},order:{sum:0,state:"无对比"},change:{sum:0,state:"无对比"},money:{sum:0,state:"无对比"},price:{sum:0,state:"无对比"}},
          change:{customer:0,project:0,success:0},
          rank:{make:0,success:5},
        },
        show:false,
        maxDate: new Date(),
        currentDate: new Date(),
        getValues:''
      }
    },
    created() {
      this.$store.commit('getActive',3)
      this.axios.get('paper.php?type=paper&token=e0bc95d9445836ae05679203a9b8fe3e')
        .then(res=>{
          console.log(res.data[0]);
          this.myPaper=res.data[0];
          // console.log(res.data[0]);
        })
    },
    methods:{
      updateTime() {
        this.show=true;
      },
      change(val) {
        this.getValue=val.getValues();
        // console.log(val.getValues());
      },
      confirm(val) {
        this.myPaper.time=this.getValue==undefined?this.myPaper.time:this.getValue.join('-');
        console.log(this.myPaper.time);
        this.axios.get('paper.php?type=paper&token=e0bc95d9445836ae05679203a9b8fe3e&time='+this.myPaper.time)
          .then(res=>{
            this.myPaper=res.data[0];
            console.log(res.data);
            this.show=false;
          })
      }
    }
  }
</script>

<style scoped>
  .applyCard {
    padding: .4rem .5rem;
  }
  .applyCard h3,.card-content>span {
    font-family: "chen";
    color: #333333;
    font-size: .5rem;
    font-weight: normal;
  }
  .apply-title .right {
    width: 1.25rem;
  }
  .apply-title .right img {
    border-radius: 50%;
  }
  .apply-title span {
    font-size: .36rem;
    line-height: 3;
  }
  .apply-boldLine {
    height: .1rem;
    width: 100%;
    background: #000;
  }
  .apply-Line {
    height: 0.04rem;
    width: 100%;
    margin-top: .1rem;
    background: #000;
  }
  .card-content {
    margin-top: .75rem;
    padding-bottom: .5rem;
    border-bottom: 1px dashed #aaa;
  }
  .biao {
    width: .1rem;
    height: .43rem;
    position: relative;
    top: .02rem;
    background: #000;
    display: inline-block;
  }
  .card-add {

  }
  .card-add .left {
    width: 30%;
    margin-left: 1.05rem;
    margin-top: .6rem;
  }
  .card-add .left p {
    color: #888888;
    font-size: .36rem;
    line-height: 1.5;
  }
  .card-add .left p:nth-child(2) {
    font-size: .7rem;
    color: #000;
  }
  .card-add {

  }
  .card-add {

  }
  .card-top span:nth-child(2) {
    font-family: "chen";
  }
  .fixPosition {
    position: relative;
  }
  .change-one {
    position: absolute;
    left: .3rem;
    top: 12%;
  }
  .change-two {
    position: absolute;
    right: 0rem;
    top: 37%;
  }
  .change-three {
    position: absolute;
    left: .3rem;
    top: 62%;
  }
  .applyCard-fixed {
    position: relative;
    margin: .2rem 0;
  }
  .applyCard-fixed .triange-bottom {
    position: absolute;
    left: 45%;
    bottom: .08rem;
    width:0;
    height:0;
    border: .15rem solid;
    border-color: #666 transparent transparent;
  }
</style>
