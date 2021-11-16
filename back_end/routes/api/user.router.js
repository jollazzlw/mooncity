const Router = require('koa-router')

const {
  addUser,
  login,
  getSelf,
  updateUserInfo,
  getHomeInfo,
  getAboutMe,
  getUserAvatar,
} = require('../../controller/user.controller')

const userRouter = new Router()

// 创建用户  
userRouter.post('/addUser', addUser)

// 登录
userRouter.post('/login', login)

// 获取登录的用户的个人信息  主要是拿到userName ,motto存放到 vuex的store 中用来显示
userRouter.get('/profile', getSelf)

// 修改用户个人信息
userRouter.post('/updateUserInfo', updateUserInfo)

// 获取后台系统首页的信息
userRouter.get('/getHomeInfo', getHomeInfo)

// 获取关于我的信息
userRouter.get('/getAboutMe', getAboutMe)

// 获取用户头像
userRouter.get('/avatar/:avatarName', getUserAvatar)

module.exports = userRouter