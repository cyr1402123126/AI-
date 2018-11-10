<template>
    <div class="info">
      <div class="work-header">
        <div class="header-top">
          <div class="header-wraper">
            <div class="wraper-top">
              <div class="left">
                <img :src="look.top.src" alt="">
              </div>
              <div class="left label">
                <p class="title">{{ look.top.name }}</p>
                <p>
                  <span>{{ look.top.label[0] }}</span>
                  <span>{{ look.top.label[1] }}</span>
                  <span>{{ look.top.label[2] }}</span>
                </p>
              </div>
            </div>
            <div class="height"></div>
            <div class="wraper-bottom clearfix">
              <div class="left" @click="alertDate">
                <p class="title">{{ look.top.time }}</p>
                <p>预计成交日期</p>
              </div>
              <div class="right" @click="alertPercentage">
                <p class="title">{{ look.top.percentage }}%</p>
                <p>预计成交概率</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-container">
        <van-tabs v-model="active">
          <!--互动-->
          <van-tab title="互动">
            <!--style="height:8.8rem"-->
            <VueBetterScroll
              style="height:10rem"
              class="wrapper"
              ref="scroll">
              <div class="action">
                <div class="action-box" v-for="(item,index) in look.action" :key="index">
                  <img src="@/assets/images/sign_yellow.png" alt="">
                  <p class="time">{{ item.time }}<span>{{ item.hour }}</span></p>
                  <p class="update">{{ item.content }}</p>
                </div>
              </div>
            </VueBetterScroll>
          </van-tab>
          <!--资料-->
          <van-tab title="资料">
            <VueBetterScroll
              style="height:10rem"
              class="wrapper"
              ref="scroll">
              <div class="data">
                <div class="data-content">
                  <ul class="clearfix">
                    <li>备注名<span class="right">{{ look.data.top.name }}</span></li>
                    <li>公司<span class="right">{{ look.data.top.company }}</span></li>
                    <li>职位<span class="right">{{ look.data.top.major }}</span></li>
                    <li>授权手机<span class="right">{{ look.data.top.reallyPhone }}</span></li>
                    <li>备注手机<span class="right">{{ look.data.top.remarkPhone }}</span></li>
                  </ul>
                </div>
                <div class="data-content">
                  <ul class="clearfix">
                    <li>TA的标签
                      <span class="right">
                        <mark v-for="(item,index) in look.data.label" :key="index">{{ item }}%</mark>
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="data-content">
                  <p>已经成为你的客户<span>{{ look.data.bottom.time }}</span>天</p>
                  <ul class="clearfix">
                    <li>来源<span class="right">{{ look.data.bottom.name }}</span></li>
                    <li>微信昵称<span class="right">{{ look.data.bottom.wechat }}</span></li>
                    <li>性别<span class="right">{{ look.data.bottom.sex }}</span></li>
                    <li>邮箱<span class="right">{{ look.data.bottom.email }}</span></li>
                    <li>地址<span class="right">{{ look.data.bottom.where }}</span></li>
                    <li>生日<span class="right">{{ look.data.bottom.birthday }}</span></li>
                    <li>备注<span class="right">{{ look.data.bottom.remark }}</span></li>
                  </ul>
                </div>
              </div>
            </VueBetterScroll>
          </van-tab>
          <!--AI分析-->
          <van-tab title="AI分析">
            <VueBetterScroll
              style="height:10rem"
              class="wrapper"
              ref="scroll">
              <div class="chart">
                <Interest :chartData="look.chart.interest"></Interest>
                <Active :chartData="look.chart.active"></Active>
                <Action :chartData="look.chart.action"></Action>
              </div>
            </VueBetterScroll>
          </van-tab>
        </van-tabs>
      </div>
      <!--底部栏-->
      <van-tabbar v-model="active1">
        <van-tabbar-item icon="records" :to="{name:'compile'}">编辑资料</van-tabbar-item>
        <van-tabbar-item icon="chat">发消息</van-tabbar-item>
        <van-tabbar-item icon="shop" :to="{name:'add'}">添加跟进</van-tabbar-item>
      </van-tabbar>

      <!--选择比例-->
      <van-popup v-model="percentageShow" position="bottom" :overlay="true">
        <van-picker
          show-toolbar
          title=""
          :columns="columns"
          @cancel="percentageCancel"
          @confirm="percentageConfirm"
        />
      </van-popup>

      <!--选择时间-->
      <van-popup v-model="dateShow" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          @confirm="dateConfirm"
          @change="dateChange"
        />
      </van-popup>

    </div>
</template>

<script>
  import  VueBetterScroll  from 'vue2-better-scroll'
  import Interest from '@/components/template/type/Interest'
  import Active from '@/components/template/type/Active'
  import Action from '@/components/template/type/Action'
  let count = 1;
  export default {
    name: "CustomerInfo",
    components:{
      VueBetterScroll,
      Interest,
      Active,
      Action
    },
    data() {
      return {
        look:'',
       /* look:{
          top:{
            src:require('@/assets/images/logo.png'),
            name:"金龟子",
            label:['添加标签','添加标签','添加标签'],
            time:'2018/10/31',
            percentage:'1%'
          },
          action:[
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
            {time:'2018-10-24',hour:'23:55',content:'更新预计成交率为：14%'},
          ],
          data:{
            top:{
              name:'陈鸿真',
              company:"陈鸿真",
              major:'陈鸿真',
              reallyPhone:'陈鸿真',
              remarkPhone:'陈鸿真',
            },
            label:['陈鸿真','陈鸿真','陈鸿真','陈鸿真','陈鸿真',],
            bottom:{
              time:'0',
              name:'陈鸿真',
              wechat:"陈鸿真",
              sex:'陈鸿真',
              email:'陈鸿真',
              where:'陈鸿真',
              birthday:'陈鸿真',
              remark:'陈鸿真',
            }
          },
          chart:{
            //客户兴趣占比
            interest: {
              columns: ['状态', '访问用户'],
              rows: [
                { '状态': '对我感兴趣', '访问用户': 1393 },
                { '状态': '对产品感兴趣', '访问用户': 3530 },
                { '状态': '对公司感兴趣', '访问用户': 2923 },
              ]
            },
            //近15日活跃度
            active: {
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '09-22', '访问用户': 1393},
                { '日期': '09-24', '访问用户': 3530},
                { '日期': '09-26', '访问用户': 2923},
                { '日期': '09-28', '访问用户': 1723},
                { '日期': '09-30', '访问用户': 3792},
                { '日期': '09-2', '访问用户': 4593}
              ]
            },
            //客户与我的互动
            action: {
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '咨询产品', '访问用户': 1393},
                { '日期': '保存电话', '访问用户': 3530},
                { '日期': '点赞', '访问用户': 2923},
                { '日期': '拨打电话', '访问用户': 1723},
                { '日期': '添加印象', '访问用户': 3792},
                { '日期': '评论', '访问用户': 3293}
              ]
            }
          },
        },*/
        active1:0,
        data:{
          username:9,
          customer:5,
          watch:160,
          share:15,
          time:'0'
        },
        active:0,
        percentageShow:false,
        columns: ['1', '2', '3', '4', '5','6','7','8','9','10','11', '12', '13', '14', '15','16','17','18','19','20',
          '21', '22', '23', '24', '25','26','27','28','29','30','31', '32', '33', '34', '35','36','37','38','39','40',
          '41', '42', '43', '44', '45','46','47','48','49','50','51', '52', '53', '54', '55','56','57','58','59','60',
          '61', '62', '63', '64', '65','66','67','68','69','70','71', '72', '73', '74', '75','76','77','78','79','80',
          '81', '82', '83', '84', '85','86','87','88','89','90','91','91', '92', '93', '94', '95','96','97','98','99','100',],
        time:'2018/10/31',
        test:"1%",
        dateShow:false,
        minDate:new Date(),
        currentDate:new Date(),
        getValue:'',
      }
    },
    created() {
      this.$store.commit('getActive',2)
      let staff_id=this.getCookie('staff_id');
      this.axios.post('customer_detail.php',{
        token : "af79028c6574ed3b6359b74ab0112796",
        type : "customer_detail",
        staff_id : staff_id,
        customer_id  : this.$route.params.id
      }).then(res=>{
        this.look=res.data;
      })
    },
    methods: {
      alertDate() {
        this.dateShow=true;
      },
      alertPercentage() {
        this.percentageShow=true;
      },
      percentageConfirm(picker, value, index) {
        // Toast(`当前值：${value}, 当前索引：${index}`);
        console.log(picker);
        this.look.top.percentage=picker;
        this.percentageShow=false;
      },
      percentageCancel() {

      },
      dateConfirm(val) {
        console.log(this.look.top.time);
        this.look.top.time=this.getValue==''?this.look.top.time:this.getValue.join('-');
        console.log(this.look.top.time);
        this.dateShow=false;
      },
      dateChange(val) {
        this.getValue=val.getValues();
      }
    }
  }
</script>

<style scoped lang="scss">
  .data {
    .data-content {
      padding: .4rem 0;
      border-bottom: 1px solid #efefef;
      >p {
        color: #c2c2c2;
      }
      li {
        color: #c2c2c2;
        font-size: .42rem;
        height: 1.2rem;
        line-height: 1.2rem;
        span {
          color: #3e3e3e;
          width: 70%;
          mark {
            padding: .12rem .33rem;
            border: 1px solid #dff3fe;
            background: #dff3fe;
            color: #98c9e9;
            margin: .1rem;
            display: inline-block;
            line-height: normal;
          }
        }
      }
    }
  }
  .info-container {
    overflow: hidden;
  }
  .chart {
    padding-top: .4rem;
  }
  .action {
    border-left: 1px solid #e1e1e1;
    padding-left: .4rem;
    margin-top: .5rem;
    margin-bottom: 1.5rem;
    .action-box {
      position: relative;
      padding-bottom: .6rem;
      img {
        width: .3rem;
        position: absolute;
        left: -.55rem;
        top: .06rem;
      }
      .time {
        color: #888888;
        font-size: .4rem;
      }
      .update {
        margin-top: .1rem;
        color: #333333;
        font-size: .42rem;
      }
      span {
        margin-left: .5rem;
      }
    }
  }
  .header-top {
    height: 3rem;
    width: 100%;
    background: #3e84ff;
    border-bottom-left-radius: 30%;
    border-bottom-right-radius: 30%;
    padding-top: .5rem;

  }
  .height {
    width: 150%;
    position: relative;
    right: .5rem;
    height: 1px;
    background: #efefef;
  }
  .work-header {
    height: 5.5rem;
  }
  .header-wraper {
    width: 9.7rem;
    background: #fff;
    margin: 0 auto;
    box-shadow: .02rem .08rem .18rem rgba(0,0,0,0.18);
    box-sizing: border-box;
    border-radius: .15rem;
    padding: .36rem .45rem;
    overflow: hidden;
    .wraper-top {
      .left:nth-child(1) {
        width: 1.7rem;
        height: 1.7rem;
        img {
          border-radius: .1rem;
        }
      }
      .label {
        margin-left: .3rem;
        .title {
          font-size: .48rem;
          color: #000;
        }
        p:nth-child(2) {
          margin-top: .3rem;
          span {
            color: #999999;
            font-size: .32rem;
            border: 1px solid #999999;
            border-radius: .27rem;
            padding: .07rem .2rem;
            margin-right: .2rem;
          }
        }
      }
    }
    .wraper-bottom {
      text-align: center;
      padding: .3rem 0 0rem 0;
      p {
        color: #888888;
        font-size: .36rem;
      }
      .title {
        font-size: .48rem;
        color: #333333;
      }
      .left p:nth-child(1),.right p:nth-child(1) {
        margin-bottom: .12rem;
      }
      .left {
        width: 50%;
      }
      .right {
        width: 50%;
      }

    }
  }
  .header-wraper .wraper-top {
    height: 2rem;
  }
  .van-tab__pane {
    padding: 0 .5rem;
  }
</style>
