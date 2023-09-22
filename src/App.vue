
<template>
  <router-view/>
</template>

<script setup>
 import * as echarts from 'echarts';
 import {provide,inject  } from 'vue';
 provide("echarts",echarts)

</script>

<style lang="scss">

</style>
