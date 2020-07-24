import axios from 'axios'
import { message } from "@/utils/utils";
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建请求实列
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 携带用户 token
      config.headers['X-Access-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 返回拦截器
service.interceptors.response.use(
  /**
   * 如果您想获得http信息，如头信息或状态信息
   * 请返回  response => response
   * 通过自定义代码确定请求状态
   * 这里只是一个例子
   * 你也可以通过HTTP状态码来判断状态
   */
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data.result;
    if (!response.data.success) {
      message(response.data.message, "error")
      if (!response.data.code === "401") {
        store.dispatch('LogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      } else {
        return Promise.reject('error');
      }
    } else {
      return res;
    }
  },
  error => {
    message(error, "error")
    return Promise.reject(error);
  }
)

export default service

// get请求
export function get(url, params = {}) {
  return service.get(url, { params })
}

// postJson请求， data是body数据
export function post(url, data = {}) {
  return service.post(url, data, undefined)
}

// post表单请求， params是表单数据
export function postWithFromDate(url, params = {}) {
  return service.post(url, undefined, { params })
}

// 同上
export function put(url, data = {}, params = {}) {
  return service.put(url, data, { params })
}

// 同上
export function del(url, data = {}, params = {}) {
  return service.delete(url, { data, params })
}

export function delWithParams(url, params = {}) {
  return service.delete(url, { params })
}
