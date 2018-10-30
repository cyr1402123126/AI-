<template>
    <div>
      <p>客户兴趣占比</p>
      <Vepie :data="chartData"></Vepie>
    </div>
</template>

<script>
  import Vepie from 'v-charts/lib/pie'
  export default {
    name: "Interest",
    data() {
      return {
/*        chartData: {
          columns: ['状态', '访问用户'],
          rows: [
            { '状态': '对我感兴趣', '访问用户': 1393 },
            { '状态': '对产品感兴趣', '访问用户': 3530 },
            { '状态': '对公司感兴趣', '访问用户': 2923 },
          ]
        }*/
      }
    },
    props:['chartData'],
    components:{
      Vepie
    }
  }
</script>

<style scoped>
  p {
    text-align: center;
    margin-bottom: .5rem;
    font-size: .46rem;
  }
</style>
