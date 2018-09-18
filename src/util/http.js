import Vue from 'vue'
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

const Axios = Vue.http
const axios = Axios.create()

axios.defaults.timeout = 5000
// 超时重试次数和间隔
axios.defaults.maxRetryCount = 2
axios.defaults.delay = 1000
axios.interceptors.request.use(
  config => {
    Vue.$vux.loading.show({
      text: 'Loading'
    })
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    Vue.$vux.loading.hide()
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

Vue.prototype.ajaxAxios = axios
