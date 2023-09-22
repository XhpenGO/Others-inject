<template>
  <div class="login">
    <!-- 登录注册 -->
    <div class="login-con">
      <ul class="menu-tab">
        <li v-for="v in MenuData" :key="v.type" :class="{ current: v.current }" @click="clickMenu(v)">
          {{ v.txt }}
        </li>
      </ul>
      <!-- 表单部分 -->
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" minlength="6" maxlength="18" />
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input v-model="ruleForm.passwords" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button :disabled="btnbool" type="primary" class="login-btn block" @click="submitForm(ruleFormRef)">{{ model === 'login' ? '登录' : '注册' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 创建复杂数据类型
import { reactive, ref, onMounted, watch } from 'vue'
import type { FormInstance, FormRules, ElMessage } from 'element-plus'
import * as ck from '../../util/verfifcation.js'
import link from '../../api/Link.js'
import apiUrl from '../../api/url.js'
import useMd5 from '../../hook/index'
import { useRouter } from 'vue-router'
let router=useRouter()

// 切换模块
const MenuData = reactive([
  { txt: '登录', current: true, type: 'login' },
  { txt: '注册', current: false, type: 'register' },
])

onMounted(() => {
  console.log(process.env.VUE_APP_API)
})

let model = ref('login')

let clickMenu = (item: any) => {
  MenuData.forEach((elemt) => {
    elemt.current = false
  })
  item.current = true

  // 修改保存点击的状态
  model.value = item.type
}

// element表单模块
const ruleFormRef = ref<FormInstance>()
// 邮箱验证
const checkUser = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('邮箱账号不能为空！'))
  } else if (ck.CkEmail(value)) {
    return callback(new Error('邮箱格式错误，请重新输入！'))
  } else {
    callback()
  }
}
// 密码验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空！'))
  } else if (ck.CkPass(value)) {
    return callback(new Error('密码格式有误,必须在6至18位字母+数字！'))
  } else {
    callback()
  }
}
// 重复密码验证
const validatePass2 = (rule: any, value: any, callback: any) => {
  // 登录选项中没有重复密码的校验 在登录页取消重复密码校验
  if (model.value === 'login') {
    callback()
  }

  if (value === '') {
    callback(new Error('重复密码不能为空！'))
  } else if (value !== ruleForm.password) {
    callback(new Error('密码不一致，请重新输入!'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
  passwords: '',
})

// 登录按钮在无值的时候无法登录
let btnbool = ref(true)
watch(ruleForm, (newval, oldval) => {
  if (model.value === 'login') {
    if (newval.username != '' && newval.password != '') {
      btnbool.value = false
    } else {
      btnbool.value = true
    }
  } else {
    if (newval.username != '' && newval.password != '' && newval.passwords != '') {
      btnbool.value = false
    } else {
      btnbool.value = true
    }
  }
})

// 设置以哪种方式触发发表单验证
const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  passwords: [{ validator: validatePass2, trigger: 'blur' }],
  username: [{ validator: checkUser, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      if (model.value === 'login') {
        console.log('登录')
        // 登录模块 —— 查找数据库是否存在
        link(apiUrl.register,"get",{},{name:ruleForm.username,pwd:useMd5(ruleForm.password)}).then((ok: any) => {
          console.log(ok,"查询成功")
          if(ok.data.length!==0){
            console.log("登录成功");
            ElMessage({
              message: '登录成功',
              type: 'success',
            })
            router.push("/home")
          }else{
            console.log("登录失败");
            ElMessage.error('登录失败')
            ruleForm.password=""
            return
          }
        })

      } else {
        console.log('注册')
        // 注册模块 —— 
        let data = {
          name: ruleForm.username,
          pwd: useMd5(ruleForm.password),
        }
        // 接受返回的数据
        link(apiUrl.register, 'POST', data).then((ok: any) => {
          console.log(ok)
          // 判断返回的数据data里面是否有值
          if (Object.keys(ok.data).length !== 0) {
            ElMessage({
              message: '注册成功',
              type: 'success',
            })
            // 将上方按钮进行切换
            // MenuData.forEach(v=>{
            //   v.current=false
            // })
            MenuData[0].current = true
            MenuData[1].current = false
            // 注册跳转后将账号密码设为空
            ruleForm.password = ''
            ruleForm.username = ''
            ruleForm.passwords = ''
            // 注册成功后回到登录窗口
            model.value = 'login'
          } else {
            ElMessage.error('注册失败')
          }
        })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
.login {
  background-color: skyblue;
  height: 100%;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(255, 255, 255, 0.5);
  }
}
.demo-ruleForm {
  width: 30%;
  margin: 50px auto;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 20px;
  }
}
</style>
