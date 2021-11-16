import axios from '../utils/request'
import uploadFile from '../utils/uploadFile'

// 登录
export const login = (user) => axios.post('/user/login', user)

// 获取用户信息,主要是获取userName ,motto 用来在组件中显示,
export const getSelfInfo = (user) => axios.get('/user/profile')

// 获取主页的信息
export const getHomeInfo = () => axios.get('/user/getHomeInfo')

// 上传文件,这里主要是用来上传文章中的图片的
export const uploadImg = data => uploadFile.post('/upload', data)

// 更新aboutme
export const updataAboutMe = data => axios.post('/user/updateUserInfo', data)