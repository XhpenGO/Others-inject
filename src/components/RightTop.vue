<template>
  <div>
    <el-icon @click="ck"><CaretLeft v-if="$store.state.HomeModule.navBool" /><CaretRight v-else /></el-icon>
  </div>
</template>

<script setup>
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
import {useStore} from 'vuex'

let store=useStore()
let ck = () => {
  store.commit("SET_NAV_BOOL")
}


</script>

<style lang="scss">
.el-header {
  line-height: 70px;
  .el-icon {
    font-size: 20px;
  }
}
</style>
