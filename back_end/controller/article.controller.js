const artServ = require('../services/article.service')
const { apiHandle } = require('../routes/getSendMessage');     //用于处理route的返回信息
const Article = require('../models/tables/article');

class articleController {

  //添加文章
  async addArticle(ctx, next) {
    console.log('添加文章');
    try {
      const bodyData = ctx.request.body
      bodyData.userId = ctx.request.userId
      // bodyData.userId = 1;
      const result = await artServ.addArticle(bodyData)
      apiHandle(ctx, result, '增加文章失败, 刷新一下试试~~')
    } catch (e) {
      console.log(e)
    }
  }

  // 获取文章列表
  async getArtList(ctx, next) {
    console.log('获取文章列表');
    try {
      const { pageSize = 5, pageNum = 1, isHome = false } = ctx.request.body
      const result = await artServ.getArticleList(pageNum, pageSize, isHome)
      console.log(result);
      apiHandle(ctx, result, '获取文章列表失败, 刷新一下试试~~')
    } catch (e) {
      console.log(e);
    }

  }
  //获取一篇文章的细节
  async getArticleDetail(ctx, next) {
    try {
      console.log('获取文章的细节');
      const { id, userId } = ctx.request.query;
      console.log('id', id, 'userId', userId);

      const result = await artServ.getArticleDetail(id, userId)
      apiHandle(ctx, result, '获取全文失败!请重试~')
    } catch (e) {
      console.log(e);
    }
  }

  // 喜欢文章
  async likeArticle(ctx, next) {
    try {
      console.log('喜欢文章');
      const { articleId } = ctx.request.body
      const result = await artServ.likeArticle(articleId)
      apiHandle(ctx, result, '喜欢文章失败，刷新一下试试~~')
    } catch (e) {
      console.log(e);
    }
  }



}
module.exports = new articleController();