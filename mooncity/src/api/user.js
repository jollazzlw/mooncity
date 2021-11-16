import axios from '@utils/request'

// 增加用户
export const addUser = data => axios.post('/user/addUser', data)

// 用户登录
export const login = data => axios.post('/user/login', data)

// 修改用户信息
export const updateUserInfo = data => axios.post('/user/updateUserInfo', data)