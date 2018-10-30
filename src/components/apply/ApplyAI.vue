<template>
  <div class="ApplyAI">
    <van-tabs v-model="active">
      <van-tab title="汇总">
        <AIData :customer="customer" :data="data"></AIData>
      </van-tab>
      <van-tab title="昨日">
        <AIData :customer="yesterday" :data="data"></AIData>
      </van-tab>
      <van-tab title="近7天">
        <AIData :customer="beforeSevenDay" :data="data"></AIData>
      </van-tab>
      <van-tab title="近30天">
        <AIData :customer="beforeThirtyDay" :data="data"></AIData>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import AIData from '@/components/apply/AIData.vue'
  export default {
    name: "ApplyAI",
    data() {
      return {
        active:0,
        data:'',
        customer:'',
        yesterday:'',
        beforeSevenDay:'',
        beforeThirtyDay:''
        /*
        customer:{
          title:[
            {name:"客户总数",sum:15},
            {name:"跟进总数",sum:15},
            {name:"浏览总数",sum:15},
            {name:"被转发总数",sum:15},
            {name:"被保存总数",sum:15},
            {name:"被点赞总数",sum:15},
          ]
        },
        yesterday:{
          title:[
            {name:"新增客户数",sum:1,type:"持平"},
            {name:"跟进客户数",sum:0,type:"持平"},
            {name:"浏览客户数",sum:11,type:"-66.7%"},
            {name:"被转发次数",sum:1,type:"-75%"},
            {name:"被保存总数",sum:15,type:"-100%"},
            {name:"被点赞总数",sum:15,type:"持平"},
          ]
        },
        beforeSevenDay:{
          title:[
            {name:"新增客户数",sum:10,type:"持平"},
            {name:"跟进客户数",sum:0,type:"无对比"},
            {name:"浏览客户数",sum:11,type:"+330.0%"},
            {name:"被转发次数",sum:1,type:"-75%"},
            {name:"被保存总数",sum:15,type:"-100%"},
            {name:"被点赞总数",sum:15,type:"持平"},
          ]
        },
        beforeThirtyDay:{
          title:[
            {name:"新增客户数",sum:7,type:"无对比"},
            {name:"跟进客户数",sum:0,type:"无对比"},
            {name:"浏览客户数",sum:11,type:"无对比"},
            {name:"被转发次数",sum:1,type:"无对比"},
            {name:"被保存总数",sum:15,type:"无对比"},
            {name:"被点赞总数",sum:15,type:"无对比"},
          ]
        },
         data:{
           //成功率漏斗
           success : {
             columns: ['状态', '销售量'],
             rows: [
               { '状态': '<=50%', '销售量': 11 },
               { '状态': '<=80%', '销售量': 4 },
               { '状态': '<=99%', '销售量': 2 },
               { '状态': '<=100%', '销售量': 1 },
             ],
             type:{
               day_7:[
                 { '状态': '<=50%', '销售量': 11 },
                 { '状态': '<=80%', '销售量': 4 },
                 { '状态': '<=99%', '销售量': 2 },
                 { '状态': '<=100%', '销售量': 1 },
               ],
               day_15:[
                 { '状态': '<=50%', '销售量': 11 },
                 { '状态': '<=80%', '销售量': 4 },
                 { '状态': '<=99%', '销售量': 2 },
                 { '状态': '<=100%', '销售量': 1 },
               ],
               day_30:[
                 { '状态': '<=50%', '销售量': 11 },
                 { '状态': '<=80%', '销售量': 4 },
                 { '状态': '<=99%', '销售量': 2 },
                 { '状态': '<=100%', '销售量': 1 },
               ]
             }
           },
           //商城订单量
           shop: {
             columns: ['日期', '商城订单量', '交易金额'],
             rows: [
               { '日期': '09-22', '商城订单量': 1393, '交易金额': 1093},
               { '日期': '09-23', '商城订单量': 3530, '交易金额': 3230},
               { '日期': '09-24', '商城订单量': 2923, '交易金额': 2623},
               { '日期': '09-25', '商城订单量': 1723, '交易金额': 1423},
               { '日期': '09-26', '商城订单量': 3792, '交易金额': 3492},
               { '日期': '09-27', '商城订单量': 3593, '交易金额': 4293}
             ]
           },
           //新增客户数
           peopleSum: {
             columns: ['日期', '访问用户'],
             rows: [
               { '日期': '09-22', '访问用户': 1393},
               { '日期': '09-23', '访问用户': 3530},
               { '日期': '09-24', '访问用户': 2923},
               { '日期': '09-25', '访问用户': 1723},
               { '日期': '09-26', '访问用户': 3792},
               { '日期': '09-27', '访问用户': 1593}
             ]
           },
           //咨询客户数
           consult: {
             columns: ['日期', '访问用户'],
             rows: [
               {'日期': '09-22', '访问用户': 1393},
               {'日期': '09-23', '访问用户': 3530},
               {'日期': '09-24', '访问用户': 2923},
               {'日期': '09-25', '访问用户': 1723},
               {'日期': '09-26', '访问用户': 3792},
               {'日期': '09-27', '访问用户': 4593}
             ]
           },
           //跟进客户数
           follow: {
             columns: ['日期', '访问用户'],
             rows: [
               { '日期': '09-22', '访问用户': 1393},
               { '日期': '09-23', '访问用户': 3530},
               { '日期': '09-24', '访问用户': 2923},
               { '日期': '09-25', '访问用户': 1723},
               { '日期': '09-26', '访问用户': 3792},
               { '日期': '09-27', '访问用户': 4593}
             ]
           },
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
         }*/
      }
    },
    components:{
      AIData
    },
    created() {
      this.axios.post('https://mp.wedotop.com/Api/report.php',{
        type : "report",
        token : "cf2b3ffc3a4dac37c1f08c7820f54138",
      }).then(res=>{
        this.customer=res.data.customer;
        this.yesterday=res.data.yesterday;
        this.beforeSevenDay=res.data.beforeSevenDay;
        this.beforeThirtyDay=res.data.beforeThirtyDay;
        this.data=res.data.data;
        console.log(res.data);
      })
    }
  }
</script>

<style scoped>

</style>
