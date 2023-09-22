import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {Histogram,List,UserFilled } from '@element-plus/icons-vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/IndexView.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/HomeView.vue'),
    children: [
      {
        path: '/echarts',
        name: 'echarts',
        component: () => import('../views/home/child/EchartsView.vue'),
        meta:{
          title:"数据展示",
          icon:Histogram
        }
      },
      {
        path: '/pay',
        name: 'pay',
        component: () => import('../views/home/child/PayList.vue'),
        meta:{
          title:"缴费信息",
          icon:List
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/home/child/UserOne.vue'),
        meta:{
          title:"用户信息",
          icon:UserFilled
        },
        children: [
          {
            path: '/userlist',
            name: 'userlist',
            component: () => import('../views/home/child/UserList.vue'),
            meta:{
              classifyTitle:'住户信息',
              title:"用户信息列表展示"
            }
          },
          {
            path: '/userupdate',
            name: 'userupdate',
            component: () => import('../views/home/child/UserUpdate.vue'),
            meta:{
              classifyTitle:'住户信息',
              title:"用户信息修改"
            }
          },
        ]
      },
    ]
  },


]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
