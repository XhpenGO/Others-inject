<template>
  <div>
    <el-table :data="$store.state.HomeModule.listdata.slice((currentPage4 - 1) * pageSize4, currentPage4 * pageSize4)" style="width: 100%">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="title" label="楼盘"  />
      <el-table-column prop="type" label="房屋类型" />
      <el-table-column prop="number" label="门牌号" />
      <el-table-column prop="hometype" label="房屋结构" />
      <el-table-column prop="name" label="户主名称" />

      <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>

    </el-table>

    <!-- 分页区域 -->
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :current-page="currentPage4" layout="total, sizes, prev, pager, next, jumper" :total="tableData.listdata.length" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  
    <!-- 弹出框 -->
    <UpdateDialog/>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted,reactive } from 'vue'
import UpdateDialog from '../../../components/UpdateDialog.vue'
import { useStore } from 'vuex'
let store=useStore()

interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)

  store.commit("SET_DIALOG",row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
  store.dispatch("DEL_DATA",row)
}


const currentPage4 = ref(1)
const pageSize4 = ref(15)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  // 每页显示条数
  pageSize4.value = val
}
const handleCurrentChange = (val: number) => {
  // 当前页数
  currentPage4.value = val
}

let tableData=reactive({
  listdata:[]
})

onMounted(() => {

  store.dispatch("USERUPDATA_LIST")

})

</script>

<style scoped>
/* .demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
} */

</style>
