const fs = require('fs')
const path = require('path')

const Router = require('koa-router')


const audioRouter = new Router()



audioRouter.get('/audio/:audioName', (ctx, next) => {
  const { audioName } = ctx.params;
  ctx.response.set('content-type', 'audio/mp3')
  ctx.body = fs.createReadStream(path.resolve('../', `public/audio/${audioName}`))

})



module.exports = audioRouter