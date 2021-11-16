import axios from '../utils/request'

// 添加一篇新文章

export const addArticle = data => axios.post('/article/addArticle', data)