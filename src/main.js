import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import '../node_modules/nprogress/nprogress.css'
import JSONbig from 'json-bigint'
import moment from 'moment'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置 axios的常态地址
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.use(ElementUI) // 全局使用Element-ui
// 错误处理
axios.defaults.transformResponse = [function (date, headers) {
  try {
    return JSONbig.parse(date)
  } catch (err) {
    // console.log(err)
    return {}
  }
}]
// 请求拦截
axios.interceptors.request.use(function (config) {
  // // console.log('请求拦截器', config)
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // DO SOMETHING WITH REQUEST ERROR
  return Promise.reject(error)
})
Vue.filter('dateFormat', (value, format = 'YYYY-MM-DD') => {
  return moment(value).format(format)
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
