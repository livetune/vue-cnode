import axios from 'axios'

axios.defaults.timeout = 5000
// 超时重试次数和间隔
axios.defaults.maxRetryCount = 2
axios.defaults.delay = 1000
