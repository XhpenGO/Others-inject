<template>
  <div>
    <h2>每日访客统计</h2>
    <div id="chart-Tow" class="tow"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import api from '../api/url'
import link from '../api/Link'

onMounted(() => {
  let chartDom = document.getElementById('chart-Tow')
  let myChart = echarts.init(chartDom)

  link(api.chartDataTwo, 'get', {}).then((ok) => {
    console.log(ok)

    myChart.setOption({
      title: {
        text: '访客数据图',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data:["外卖","快递","一般访客","授权访客"],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: ok.data.day,
        boundaryGap:false

      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '外卖',
          type: 'line',
          // stack: 'Total',
          data: ok.data.num.外卖,
        },
        {
          name: '快递',
          type: 'line',
          // stack: 'Total',
          data: ok.data.num.快递,
        },
        {
          name: '一般访客',
          type: 'line',
          // stack: 'Total',
          data: ok.data.num.一般访客,
        },
        {
          name: '授权访客',
          type: 'line',
          // stack: 'Total',
          data: ok.data.num.授权访客,
        },
      ],
    })
  })
})
</script>

<style lang="scss">
h2 {
  height: 0.625rem;
  line-height: 0.625rem;
  text-align: center;
  font-size: 0.25rem;
  
}
.tow{
  height: 4.0rem;
}
</style>
