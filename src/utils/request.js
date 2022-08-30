import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: "http://82.157.167.144:30571",// apisix process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token == "") {
    }
    else {

    }
    const token = window.localStorage.getItem("token");
    config.headers['Authorization'] = "Bearer " +token;// store.state.account.token
    // config.headers['xtenant'] = 'Mafeiyang'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res == undefined) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 403 || res.code === 401) {
        MessageBox.confirm('身份认证信息已经过期，请重新登录', '确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('connect/endsession').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
