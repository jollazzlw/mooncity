import axios from '@utils/request'

// 添加文章评论
export const addArtCom = data => axios.post('/articleComment/addArtCom', data)

// 获取评论列表
export const getComList = data => axios.post('/articleComment/getArtComList', data)