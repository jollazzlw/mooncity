const { apiHandle } = require('../routes/getSendMessage');     //用于处理route的返回信息
const artComservice = require('../services/artComment.service')

class artComment {

  async addComment(ctx, next) {
    console.log('给文章添加评论');
    const comment = ctx.request.body
    comment.userId = ctx.request.userId
    console.log(comment);
    const result = await artComservice.addComment(comment)
    apiHandle(ctx, result, '评论添加失败，不能刷屏哦，过几分钟在试试吧~')
  }
  async getCommentList(ctx, next) {
    console.log('获取文章评论列表');
    const { page = 1, limit = 10, articleId } = ctx.request.body
    const result = await artComservice.getArtComList(page, limit, articleId)
    console.log(result);
    apiHandle(ctx, result, '获取文章列表失败，请刷新试一试吧~')
  }

}

module.exports = new artComment()