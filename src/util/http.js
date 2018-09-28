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
    console.log(error)
    Vue.$vux.loading.hide()
    if (error.response) {
      switch (error.response.status) {
        case 500:
          Vue.$vux.toast.text('服务器出错', 'bottom')
          break
        case 404:
          Vue.$vux.toast.text('服务器出错', 'bottom')
          break
        case 504:
          Vue.$vux.toast.text('服务器出错', 'bottom')
          break
        default:
          break
      }
      return Promise.reject(error)
    } else {
      const config = error.config
      config.loadText = '请求超时，正在重试'
      console.log(error)
      if (!config || !config.maxRetryCount) return Promise.reject(error)
      config.retryCount = config.retryCount || 0
      if (config.retryCount >= config.maxRetryCount) {
        Vue.$vux.toast.text('超时太多次了，刷新一下', 'bottom')
        return Promise(error)
      }
      config.retryCount += 1
      const request = new Promise(resolve => {
        setTimeout(() => resolve(), config.delay || 1)
      })
      return request.then(() => {
        axios(config)
      })
    }
  }
)

Vue.prototype.ajaxAxios = axios
