import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做一些事情
  const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  // console.log(config)
  return config
}, function (error) {
  // 做一些请求错误
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data

  return response.data.data
}, function (error) {
  // Do something with response error
  const status = error.response.status
  if (status === 401) {
    window.localStorage.removeItem('user_info')
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
