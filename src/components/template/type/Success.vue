<template>
    <div>
      <p>成交率漏斗</p>
      <Funnel :data="chartData" :settings="chartSettings"></Funnel>
    </div>
</template>

<script>
  import Funnel from 'v-charts/lib/funnel'
  export default {
    name: "Success",
    data() {
      this.chartSettings = {
        useDefaultOrder: true,
        filterZero: true
      }
      return {

      }
    },
    created () {
/*      this.chartData = {
        columns: ['状态', '销售量'],
        rows: [
          { '状态': '<=50%', '销售量': 11 },
          { '状态': '<=80%', '销售量': 4 },
          { '状态': '<=99%', '销售量': 2 },
          { '状态': '<=100%', '销售量': 1 },
        ]
      }*/
    },
    props:['chartData'],
    components: { Funnel }
  }
</script>

<style scoped>
  p {
    text-align: center;
    margin: .5rem 0;
    font-size: .46rem;
  }
</style>
