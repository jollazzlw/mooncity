import axios from '@utils/request'

// 添加一篇新文章
export const addArticle = data => axios.post('/article/addArticle', data)

// 获取文章列表
export const getArticleList = data => axios.post('/article/getArtiList', data)

// 获取文章的详情
export const getArticleDetail = (id, userId) => axios.get('/article/getArticleDetail', { params: { id, userId } })

// 喜欢文章
export const likeArticle = data => axios.post('/article/likeArticle', data)
