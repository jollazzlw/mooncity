// 1.导入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'


import LayOut from '../views/Layout'

// 2.使用vue-router
Vue.use(VueRouter)

//3.配置路由信息 
const routes = [
  {
    path: "/",
    redirect: '/login',
    hidden: true,
    meta: {
      name: '主页',
      icon: 'icon-zhengli'
    },
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: '登录',
      icon: 'icon-dili'
    },
    component: () => import('../views/Login')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: 'index',
    meta: {
      name: '主页',
      icon: 'el-icon-s-home'
    },
    component: LayOut,
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/Home')
      }
    ]


  },
  {
    path: '/article',
    name: 'Article',
    redirect: '/addArticle',
    meta: {
      name: '添加文章',
      icon: 'el-icon-edit-outline'
    },
    component: LayOut,
    children: [
      {
        path: '/addArticle',
        name: 'addArticle',
        component: () => import('../views/AddArticle')
      }
    ]

  },
  {
    path: '/about',
    name: 'AboutMe',
    redirect: '/aboutMe',
    meta: {
      name: '关于我',
      icon: 'el-icon-user'
    },
    component: LayOut,
    children: [
      {
        path: '/aboutMe',
        name: 'aboutMe',
        component: () => import('../views/AboutMe')
      }
    ]
  },
  {
    path: '/comment',
    name: 'Comment',
    redirect: '/commentList',
    meta: {
      name: '评论列表',
      icon: 'el-icon-receiving'
    },
    component: LayOut,
    children: [
      {
        path: '/commentList',
        name: 'commentList',
        component: () => import('../views/Comment')
      }
    ]
  },
  {
    path: '/set',
    name: 'Set',
    redirect: '/setting',
    meta: {
      name: '设置',
      icon: 'el-icon-setting'
    },
    component: LayOut,
    children: [
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/Setting')
      }
    ]
  },


]

// 4.创建路由对象
const router = new VueRouter({
  mode: 'history',
  routes,
})

// 5.导出路由
export default router

