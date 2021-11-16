import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 使用element-ui用于后台页面的布局
// 下面这种引入样式的方式是全部引入,这也引入会导致体积很大,如果需要按需引入,可以参考element-ui的官网,这里先不了
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// 引入markdown编辑器,用来写文章
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
