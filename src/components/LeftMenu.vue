<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="$store.state.HomeModule.navBool" @open="handleOpen" @close="handleClose" router>
   <template v-for="(v) in Router.options.routes[2].children" :key="v.path" >
     <!-- 带下拉导航 -->
     <el-sub-menu :index="v.path" v-if="v.children">
      <template #title>
        <el-icon><component :is="v.meta.icon"></component></el-icon>
        <span>{{v.meta.title}}</span>
      </template>
      <el-menu-item-group  v-for="(val,i) in v.children" :key="val.path">
        <el-menu-item :index="val.path">{{ val.meta.title }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <!-- 不带下拉导航 -->
    <el-menu-item :index="v.path" v-else>
      <el-icon><component :is="v.meta.icon"></component></el-icon>
      <span>{{v.meta.title}}</span>
    </el-menu-item>
   </template>
  </el-menu>
</template>

<script lang="ts" setup>
import {Histogram,List,UserFilled } from '@element-plus/icons-vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import router from '../router/index';

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

let Router=useRouter()
onMounted(()=>{
  console.log("获取路由规则",Router.options.routes[2].children);
  
})
</script>

<style lang=""></style>
