<template>
  <div>
    <p>近15日客户活跃度</p>
    <VeLine :data="chartData"></VeLine>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line'
  export default {
    name: "AddCustomer",
    data() {
      return {
/*        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '09-22', '访问用户': 1393},
            { '日期': '09-24', '访问用户': 3530},
            { '日期': '09-26', '访问用户': 2923},
            { '日期': '09-28', '访问用户': 1723},
            { '日期': '09-30', '访问用户': 3792},
            { '日期': '09-2', '访问用户': 4593}
          ]
        }*/
      }
    },
    props:['chartData'],
    components :{
      VeLine
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
