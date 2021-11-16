const fs = require('fs')


const userService = require('../services/user.service')
const { apiHandle } = require('../routes/getSendMessage')
const md5password = require('../utils/passwordHandle')
const jwt = require('../utils/jwt')
const path = require('path')


class userController {

  // 添加一位用户
  async addUser(ctx, next) {
    console.log('添加一位用户！');
    /**
     * 我们前端传入的必须是一个对象 例如：addUser({userName}) 这样，在这里body才能拿到这个对象
     * 如果我们传入的不是一个对例如：addUser(userName)    这样就拿到一个对象{}对象的键名是这个userName的值
     */
    const bodyData = ctx.request.body;
    const avatarUrl = ctx.request.avatarUrl || `avatar-${Math.floor(Math.random() * (7 - 1 + 1) + 1)}.jpg`
    bodyData.password = md5password(bodyData.password || 123456)
    bodyData.avatar = avatarUrl
    const result = await userService.addUser(bodyData);
    apiHandle(ctx, result, '账号重复,请更换~')
  }

  // 登录
  async login(ctx, next) {
    console.log('用户登录');
    const { account, password } = ctx.request.body
    const result = await userService.login(account + '', md5password(password || 123456))//找到返回的是一个对象，找不到返回null
    // const { id } = result   //拿到用户在数据库的中id
    console.log(result);
    apiHandle(ctx, result, '此账号不存在,或者密码错误,请重新登录', (() => {
      jwt.publish(ctx, { account, password, id: result.id })
    }))
  }
  // 获取用户个人信息
  async getSelf(ctx, next) {
    console.log('获取用户的个人信息');
    const result = await userService.getSelf(ctx.request.userId);
    // console.log(result);
    apiHandle(ctx, result, '获取个人用户信息失败')
  }
  // 修改用户的个人信息
  async updateUserInfo(ctx, next) {
    const bodyData = ctx.request.body;
    // const avatarUrl = ctx.request.avatarUrl;
    const userId = ctx.request.userId;
    console.log('修改用户个人信息');
    console.log(bodyData);
    const result = await userService.updateUserInfo(bodyData, userId)
    apiHandle(ctx, result, '个人信息修改失败')
  }
  // 获取后台首页需要的信息
  async getHomeInfo(ctx, next) {
    const result = await userService.getHomeInfo()
    apiHandle(ctx, result, '还没有文章呢,现在开始写一篇吧!')
  }
  // 获取关于我的数据
  async getAboutMe(ctx, next) {
    const userId = ctx.request.userId
    const result = await userService.getAboutMe(userId)
    apiHandle(ctx, result, '获取个人信息失败,请稍后重试')
  }
  // 获取用户头像
  async getUserAvatar(ctx, next) {
    console.log('获取用户头像');
    const { avatarName } = ctx.params
    console.log(path.resolve('../', `upload/avatar/${avatarName}.jpg`));
    ctx.response.set('content-type', 'image/jpeg')
    ctx.body = fs.createReadStream(path.resolve('../', `public/avatar/${avatarName}`))
  }
}

module.exports = new userController()