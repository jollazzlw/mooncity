/* 
这个文件是总的，路由都在这里.routes()  .allowedMethods(),之后我们只需要导出这个总的router，
然后再使用app.user () 使用这个总路由即可。
*/

const Router = require('koa-router')

const article = require('./article.router')
const user = require('./user.router')
const filesRouter = require('./upload.router')
const artComRouter = require('./articleComment.router')
const audioRouter = require('./autio.router')
const imgRouter = require('./img.router')
const router = new Router();

const routerArr = [
  {
    key: '/article', router: article
  },
  {
    key: '/user', router: user
  },
  {
    key: '', router: filesRouter
  },
  {
    key: '/articleComment', router: artComRouter
  },
  {
    key: '', router: audioRouter
  },
  {
    key: '', router: imgRouter
  },
]

routerArr.forEach(r => {
  router.use(r.key, r.router.routes(), r.router.allowedMethods());
})

module.exports = router;
