const Router = require('koa-Router')
const {
  uploadSave,
  uploadURLHandle
} = require('../../middleware/uploadController')


const filesRouter = new Router()

// 上传图片
filesRouter.post('/upload', uploadSave, uploadURLHandle)

module.exports = filesRouter
