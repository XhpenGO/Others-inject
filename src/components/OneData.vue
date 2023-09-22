<template>
  <div>
    <h2>人数统计</h2>
    <div id="chart-one" class="one"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import api from '../api/url'
import link from '../api/Link'

// let $echarts = inject('echarts')
// let data=reactive({})
let xdata = reactive({})
let ydata = reactive({})

onMounted(() => {
  // let myChart = $echarts.init(document.getElementById('chart-one'))
  let chartDom = document.getElementById('chart-one')
  let myChart = echarts.init(chartDom)
  // var option;

  link(api.chartDataOne, 'get', {}).then((ok) => {
    let { data } = ok
    xdata = data.map((v) => v.title)
    ydata = data.map((v) => v.num)
    // console.log('x', xdata)
    // console.log('y', ydata)
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: xdata,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: ydata,
          type: 'bar',
          itemStyle: {
            normal: {
              barBorderRadius: [2, 2, 0, 0],
            },
          },
        },
      ],
    })
  })
})
</script>

<style lang="scss" >
h2 {
  height: 0.625rem;
  line-height: 0.625rem;
  text-align: center;
  font-size: 0.25rem;
  
}
.one {
  height: 4.0rem;
  // color: pink;
  padding-left: 10px;
}
</style>
