const ArticleComment = require('../models/tables/articleComment')
const User = require('../models/tables/user')
const Article = require('../models/tables/article')


class artComservice {
  async addComment(comment) {
    console.log(comment);
    const ins = await ArticleComment.create(comment)
    return ins
  }
  async getArtComList(page, limit, articleId) {
    let { rows, count } = await ArticleComment.findAndCountAll({
      offset: (page - 1) * limit,
      limit: +limit,
      order: [
        ['createdAt', 'DESC']
      ],
      where: {
        articleId,
      },
      include: [
        {
          model: User,
          attributes: ['userName', 'avatar', 'id'],
          /* If we remove `required` from the include, both ArticleComment with and without
            * User will be counted  就是说没有user的数据也会被找到计数*/
          required: false
        }
      ]
    })
    const len = rows.length;     //len是我们拿到几篇文章数
    if (rows.length === 0 && !rows) return { total: 0, datas: [], len } // 如果没有评论
    const datas = this.#handleCommentList(rows)
    return {
      total: count,
      articleList: datas,
      len,
    }
  }
  #handleCommentList(datas) {
    const listArr = datas.map(row => {
      row.dataValues.children = datas.filter(item => row.id === item.floorId)
      return row
    }) // 把楼层和子楼层分组
    return listArr.filter(item => !item.floorId)
  }
}


module.exports = new artComservice()