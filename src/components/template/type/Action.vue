<template>
    <div>
      <p>客户与我的互动</p>
      <Vebar :data="chartData" :settings="chartSettings"></Vebar>
    </div>
</template>

<script>
  import Vebar from 'v-charts/lib/bar'
  export default {
    name: "Action",
    data () {
      this.chartSettings = {
        metrics: ['访问量'],
        dataOrder: {
          label: '访问量',
          order: 'desc'
        },

      }
      return {
/*        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '咨询产品', '访问用户': 1393},
            { '日期': '保存电话', '访问用户': 3530},
            { '日期': '点赞', '访问用户': 2923},
            { '日期': '拨打电话', '访问用户': 1723},
            { '日期': '添加印象', '访问用户': 3792},
            { '日期': '评论', '访问用户': 3293}
          ]
        }*/
      }
    },
    props:['chartData'],
    components:{
      Vebar
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
