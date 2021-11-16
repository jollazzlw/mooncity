import axios from 'axios'
import { Message } from "element-ui"

const instance = axios.create({
  baseURL: 'http://localhost:5006',
  timeout: 15000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true,

});

// interceptors 是拦截器,下面分别是请求拦截或者响应拦截

/**  请求拦截器
在请求前判断本地是否有token,有的话就加到请求头里面去
*/
instance.interceptors.request.use(req => {
  const token = localStorage.getItem('token')
  if (token) {
    //这里是大写的Authorization
    req.headers['Authorization'] = 'Bearer ' + token
  }
  return req
}, (err) => {
  Promise.reject(err)
})

/**  响应拦截器
 *响应的时候，如果响应的消息码是403( 没有token，token失效),在本地删除token
 */
instance.interceptors.response.use(resp => {

  if (resp.headers.authorization) {
    //这里是小写的Authorization
    localStorage.setItem("token", resp.headers.authorization)
  }
  const data = resp.data
  if (data.code !== 200) {
    Message.error({
      message: data.msg,
      offset: '50'
    })      //这是一个element-ui的alert,这里当我们登录出错时弹出
    return Promise.reject(data)
  }

  return resp
}, err => {
  if (err.response.status === 403) {
    localStorage.removeItem("token")
    Message.error('登陆已过期,请重新登陆')
  }
  return Promise.reject(err)
})

export default instance