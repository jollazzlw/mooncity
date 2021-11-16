const Article = require('../models/tables/article')
const ArticleComment = require('../models/tables/articleComment')
const User = require('../models/tables/user')

class artServ {

  // add article
  async addArticle(artObj) {
    const instance = await Article.create(artObj);     //创建一个实例,会自动同步到数据库等同于.build(obj).save()
    return instance;
  }

  // get article list
  async getArticleList(page, limit, isHome) {
    /**
     * offset   =>  page       第几页
     * limit  =>  pageSize     每页几篇文章   
     * 
     * 拿到的结果包括 rows和count
     * rows 依据limit数量拿到的文章
     * connt 是数据库中全部的文章数
     */
    let { rows, count } = await Article.findAndCountAll({
      offset: (page - 1) * limit,
      limit: +limit,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: ArticleComment,
          // required: true
        }
      ]
    })
    const len = rows.length;     //len是我们拿到几篇文章数
    if (rows.length && !rows) return { total: 0, datas: [], len }   //如果没有文章直接返回空数组的datas
    rows.forEach(item => {
      item.dataValues.index = page - 1;    //用来表示是第几页的数据，
    })

    if (!isHome) { rows = this.#listByYear(rows); }   //获取进行时间排序后的文章
    return {
      total: count,
      articleList: rows,
      len,
    }

  }

  // sort article by year des
  #listByYear(rows) {
    const yearSet = new Set();
    rows.forEach(item => {
      // console.log(typeof item.createdAt);
      const year = item.createdAt.split('-')[0];     //createdAt format 'YYYY-MM-DD HH:mm:ss'
      yearSet.has(year) ? '' : yearSet.add(year);
    })
    const yearArr = [...yearSet];   //将文章有的全部year存入数组
    // console.log('年数组', yearArr);
    yearArr.sort((a, b) => b - a)        //降序排列
    const monthArr = ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
    const yearGroupArr = [] // 把文章按照年份分组

    yearArr.forEach(year => {
      const resultArr = rows.filter(item => {

        const [rowYear, rowMonth, surplus] = item.createdAt.split('-');
        // console.log(rowYear, rowMonth, surplus);
        let rowDay = surplus.split(' ')[0];

        rowDay[0] === '0' ? rowDay = rowDay.slice(1, 2) : '';

        // 给文章加上年月日属性
        if (rowYear === year) {
          item.dataValues.year = year;
        }
        item.dataValues.month = rowMonth
        item.dataValues.monthCh = this.#handleDateMonth(rowMonth)
        item.dataValues.day = rowDay;
        return rowYear === year    //以年为单位的数组返回一组一组的文章[一个数组里面就是一个年的]
      })

      if (resultArr.length === 0) return
      monthArr.forEach(month => {
        const monthResult = resultArr.filter(item => item.dataValues.month === month)
        monthResult.length !== 0 && yearGroupArr.push(monthResult);
      })
    })

    return yearGroupArr
  }

  //get article detail by article_id and user_id  
  async getArticleDetail(id, userId) {
    let result = await Article.findOne({
      where: {
        id: id,
      },
      include: [{
        model: User,
        attributes: ['id'],
        required: false,
        through: {
          attributes: []
        },
        where: {
          id: userId
        }
      }]
    })
    if (!result) return result
    result.increment('visitsNum', { by: 1 })     //只要每次请求一次数据，就自+1
    result = result.toJSON()
    this.#handleDetailResult(result)
    return result;
  }

  // like Article
  async likeArticle(articleId) {
    const articleIns = await Article.findByPk(articleId)
    if (!articleIns) return false
    await articleIns.increment('likeNum')
    return true

  }

  // 一些用来处理数据的使用方法
  #handleDetailResult(result) {
    result.users.length === 0 ? result.isLike = false : result.isLike = true // 如果等于0就是不喜欢该文章
    const len = result.content.replace(/<\/?.+?>/g, "").replace(/(\r\n|\n|\r)/gm, "").length  //有多少字
    result.textWordNum = len
    const [year, month, surplus] = result.createdAt.split('-');
    const monthCh = this.#handleDateMonth(month)
    const day = surplus[0] === '0' ? surplus.slice(1, 2) : surplus.slice(0, 2)
    const temp = ['year', 'month', 'monthCh', 'day']
    const dateT = [year, month, monthCh, day]
    temp.forEach((item, index) => { result[item] = dateT[index] })
    delete result.users
  }
  #handleDateMonth(month) {
    const arr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    return arr[parseInt(month)]

  }
}
module.exports = new artServ()