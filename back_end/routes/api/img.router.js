const fs = require('fs')
const path = require('path')

const Router = require('koa-router')


const imgRouter = new Router()



imgRouter.get('/img/:audioName', (ctx, next) => {
  const { audioName } = ctx.params;
  ctx.response.set('content-type', 'image/jpeg')
  ctx.body = fs.createReadStream(path.resolve('../', `public/image/${audioName}`))

})



module.exports = imgRouter