import component from '../../shims-vue';
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto"><LeftMenu/></el-aside>
      <el-container>
        <el-header>
          <RightTop/>
        </el-header>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import LeftMenu from '../../components/LeftMenu'
import RightTop from '../../components/RightTop'
</script>

<style lang="scss">
.el-aside {
  background-color: #ffffff;
}
.el-header {
  // background-color: skyblue;
}
.el-main {
  background-color: rgb(238, 238, 238);
}
.el-aside,.el-container,.common-layout,#app,body,html{
  height: 100%;
}
</style>
