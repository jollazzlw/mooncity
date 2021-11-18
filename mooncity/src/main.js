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

//请求的地址
let mainUrl = '';
process.env.NODE_ENV === 'production' ? mainUrl = 'http://www.zlw.cool:5006' : mainUrl = 'http://localhost:5006'
Vue.prototype.mainUrl = mainUrl

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
