import Vue from 'vue'
import App from './App.vue'
import router from './router/handler'
import store from './store'



// 导入element-ui
import ElementUI from 'element-ui'
import('element-ui/lib/theme-chalk/index.css')
Vue.use(ElementUI)
// 导入一些样式
import 'animate.css'
import "@/style/normalize.less";

// 引入markdown-css
import 'github-markdown-css/github-markdown.css'

// 导入iconfont
import '@assets/font/iconfont.css'

Vue.prototype.mainUrl = 'http://localhost:5006'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
