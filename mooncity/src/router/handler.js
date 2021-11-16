import router from './index'
import store from '../store'


/**
 * "导航"表示路由正在发生改变。
 * vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。
 * 有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
 * 完整的导航解析流程：
    导航被触发。
    在失活的组件里调用 beforeRouteLeave 守卫。
    调用全局的 beforeEach 守卫。
    在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    在路由配置里调用 beforeEnter。
    解析异步路由组件。
    在被激活的组件里调用 beforeRouteEnter。
    调用全局的 beforeResolve 守卫 (2.5+)。
    导航被确认。
    调用全局的 afterEach 钩子。
    触发 DOM 更新。
    调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
 */
router.beforeEach((to, from, next) => {

  next();
})
router.afterEach((to, from) => {
  store.commit('setShowPageLoadScrollBar', true)
  setTimeout(() => {
    store.commit('setShowPageLoadScrollBar', false)
  }, 1200)
})

export default router
