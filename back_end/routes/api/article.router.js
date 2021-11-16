const Router = require('koa-router')
const { addArticle, getArtList, getArticleDetail, likeArticle } = require('../../controller/article.controller')

const articleRouter = new Router()


// 添加文章
articleRouter.post('/addArticle', addArticle);

// 获取文章列表
articleRouter.post('/getArtiList', getArtList)

// 获取文章详情
articleRouter.get('/getArticleDetail', getArticleDetail)

// 喜欢文章
articleRouter.post('/likeArticle', likeArticle)

module.exports = articleRouter