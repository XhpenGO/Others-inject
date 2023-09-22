<template>
  <div class="content">
    <div class="inputDom">
      <el-input v-model="input" placeholder="请输入收款金额" class="inputer" />
      <el-button type="success" @click="MarkCode" class="elbut">生成二维码</el-button>
    </div>
    <div class="qrcode" ref="qrcodeDom"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import QRcode from 'qrcodejs2'
const input = ref('')

let qrcodeDom = ref(null)

let MarkCode = () => {
  qrcodeDom.value.innerHTML=""
  nextTick(() => {
    new QRcode(qrcodeDom.value, {
      text: input.value, //生成二维码内容
      colorDark: '#000', //二维码颜色
      colorLight: '#fff', // 二维码背景色
      // correctLevel: QRcode.CorrectLEvel.H, //设置水平位置调整
    })
  })
}
</script>

<style lang="scss" scoped>
.content{
  text-align: center;
}
.qrcode {
  width: 250px;
  height: 250px;
  margin: 20px auto;
}
.inputDom{
  display: flex;
  justify-content: center;
  text-align: center;
  width: 400px;
  margin: 0 auto;
}
.elbut{
  display: inline-block;
}
.inputer{
  // width: 300px;
}
</style>
