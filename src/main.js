import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'

// 引入全局样式
import './assets/css/global.css'

Vue.prototype.$http = axios
// 配置请求根路径
axios.defaults.baseURL = 'http://shopapi.kuckji.cn/api/private/v1/'

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
