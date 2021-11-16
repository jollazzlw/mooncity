const User = require('../models/tables/user')
const Article = require('../models/tables/article')
const MyWord = require('../models/tables/myWord')
const moment = require('moment')


class userService {

  // add user
  async addUser(adminObj) {

    const [result, created] = await User.findOrCreate({
      where: { userName: adminObj.userName },
      attributes: {
        exclude: ['password'],
      },
      defaults: { ...adminObj, account: Date.now() }
    })

    // 如果已经被创建了【create ===false】   if create === true 表示这次创建的，create = false 表示本来就有
    //这里的created表示的是这次有没有创建
    if (!created) return
    /*    const avatarSrc = `../${getRandom(1, 9)}.jpg`
       result.avatar = avatarSrc
       result.save() */
    const t = result.toJSON()
    delete t.password
    return t
  }

  // login
  async login(account, password) {
    /*   findOne() :Search for a single instance[找到返回对象]. 
     Returns the first instance found, or null if none can be found.[找不到返回null] */
    console.log(account, password);
    const result = await User.findOne({
      where: {
        account,
        password
      },
      attributes: {
        exclude: ['deleteAt']
      }
    })

    if (result && result.account === account && result.password === password) {
      const t = result.toJSON()
      delete t.password
      return t
    }
    // 没有找到账户
    return null
  }

  // get profile
  async getSelf(id) {
    const result = await User.findByPk(id)
    let temp = result.toJSON()
    delete temp.password
    delete temp.deletedAt
    return temp
  }


  // update user profile
  async updateUserInfo(data, id) {
    const result = await User.findByPk(id)    //找不到的时候是null
    if (!result) return   //找不到的时候
    for (let key in data) {
      if (data[key]) {
        result[key] = data[key]
      }
    }
    result.save()
    const t = result.toJSON()
    delete t.password
    delete t.deletedAt
    return t
  }

  // get backstage home page info
  async getHomeInfo() {
    const result = await Article.findAndCountAll({
      attributes: ['createdAt'],
      order: [
        ['createdAt', 'DESC']      //依据创建时间降序,所以第一篇是最近写的
      ]
    });
    const { count, rows } = result;
    if (count === 0) return { articleCount: 0, disLastArticleDay: 0, wordCount: 0 }
    const x = new moment()                        //创建一个现在的时间
    const y = new moment(rows[0].createdAt)
    const disLastArticleDay = x.diff(y, 'day')      //距离上次写文章距离多少天了

    const wordCount = await MyWord.count()

    return {
      articleCount: count,
      disLastArticleDay,
      wordCount
    }
  }

  //get about me info
  async getAboutMe(id) {
    const result = await User.findOne({
      where: { id: 1 },
      attributes:
        ['aboutMe']
    });
    if (!result.aboutMe) return { "aboutMe": '太懒了,什么也没有留下' }
    return result.toJSON()   //这里加不加toJSON()都行,好像会自动进行的
  }
}
module.exports = new userService()