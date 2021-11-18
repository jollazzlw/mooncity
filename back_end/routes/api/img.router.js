const fs = require('fs')
const path = require('path')

const Router = require('koa-router')


const imgRouter = new Router()


// 获取图片
imgRouter.get('/img/:imgName', (ctx, next) => {
  const { imgName } = ctx.params;
  ctx.response.set('content-type', 'image/jpeg')
  ctx.body = fs.createReadStream(path.resolve('../', `public/image/${imgName}`))

})



module.exports = imgRouter