<template>
    <div class="AIData">
      <div class="AIData-top">
        <div class="top-box" v-for="(item,index) in customer.title" :key="index">
          <div>
            <p>{{ item.name }}</p>
            <p>{{ item.sum }}</p>
            <p>{{ item.type }}</p>
          </div>
        </div>
      </div>
      <!--<img style="margin: .5rem 0" src="@/assets/images/chart_test.png" alt="">-->
      <Success :chartData="data.success"></Success>
      <Interest :chartData="data.interest"></Interest>
      <Active :chartData="data.active"></Active>
      <Action :chartData="data.action"></Action>
    </div>
</template>

<script>
  import Success from '@/components/template/type/Success'
  import Interest from '@/components/template/type/Interest'
  import Active from '@/components/template/type/Active'
  import Action from '@/components/template/type/Action'
  export default {
    name: "AIData",
    props:['customer','data'],
    data() {
      return {
        /*customer:[
          {name:"客户总数",sum:15},
          {name:"跟进总数",sum:15},
          {name:"浏览总数",sum:15},
          {name:"被转发总数",sum:15},
          {name:"被保存总数",sum:15},
          {name:"被点赞总数",sum:15},
        ]*/
      }
    },
    components:{
      Success,
      Interest,
      Active,
      Action
    }
  }
</script>

<style scoped>
  .AIData {
    padding: .4rem .3rem;
  }
  .AIData-top {
    display: flex;
    align-content: space-around;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .top-box {
    flex: 1 1  2.5rem;
    width: 2rem;
    height: 3.05rem;
    vertical-align: middle;
    border: 1px solid #488bff;
    box-sizing: border-box;
    text-align: center;
    margin:.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .top-box div p {
    line-height: 2;
  }
  .top-box div p:nth-child(1) {
    color: #777;
  }
  .top-box div p:nth-child(1) {
    color:#444;
  }
</style>
