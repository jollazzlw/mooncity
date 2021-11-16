import axios from "axios";
import { Message } from "element-ui";

const baseURL = "http://localhost:5006"

const instance = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true,
  headers: { 'Content-Type': 'multipart/form-data' }    //通过form上传文件
})

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers['authorization'] = 'Beaere ' + token
  }
  return req
}, (err) => {
  Promise.reject(err)
})

instance.interceptors.response.use(resp => {

  const data = resp.data
  if (data.code !== 200) {
    Message.error(data.msg)      //这是一个element-ui的alert,这里当我们登录出错时弹出
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
