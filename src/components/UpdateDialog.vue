<template>
  <!-- 弹出框 -->
  <el-dialog v-model="$store.state.HomeModule.dialogFormVisible" title="请输入修改信息">
    <el-form :model="form">
      <el-form-item label="户主：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="楼盘名称：" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房屋类型：" :label-width="formLabelWidth">
        <el-input v-model="form.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房屋结构：" :label-width="formLabelWidth">
        <el-input v-model="form.hometype" autocomplete="off" />
      </el-form-item>
      <el-form-item label="门牌号：" :label-width="formLabelWidth">
        <el-input v-model="form.num" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(0)">取消</el-button>
        <el-button type="primary" @click="closeDialog(1)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import link from '../api/Link'
import apiUrl from '../api/url'
import { useRouter } from 'vue-router'

const form = reactive({
  name: '',
  address: '',
  num: '',
  type:'',
  hometype:''
})

let store = useStore()
let router=useRouter()
let data={ name: form.name, title: form.address, number: form.num, type: form.type, hometype: form.hometype }
let closeDialog = (num: number) => {
  if (num == 1) {
    console.log('————', store.state.HomeModule.upListData)
    link(apiUrl.userlist + '/' + store.state.HomeModule.upListData.id, 'PUT', data).then((data: any) => {
      console.log(data)
      router.go(0)
    })
    store.commit('CLOSE_DIALOG')
  } else {
    store.commit('CLOSE_DIALOG')
  }
}
const formLabelWidth = '140px'


</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
/* .el-select {
  width: 300px;
} */
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
