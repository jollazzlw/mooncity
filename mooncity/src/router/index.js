// 三部曲一：导入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 三部曲二：使用VueRouter
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
