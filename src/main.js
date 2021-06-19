import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import jQuery from 'jquery'
import './plugins/element.js'

// 引入全局样式
import './assets/css/global.css'

// 配置请求根路径
axios.defaults.baseURL = 'http://shopapi.kuckji.cn/api/private/v1/'
axios.interceptors.request.use(cofig => {
  cofig.headers.Authorization = window.sessionStorage.getItem('token')
  return cofig
})

Vue.prototype.$ = jQuery
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
