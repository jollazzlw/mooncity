const multer = require('koa-multer')
const path = require('path')
const { getResult, apiHandle } = require('../routes/getSendMessage');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = file.fieldname;
    cb(null, path.resolve('./', `../public/${type}`))
  },
  filename: function (req, file, cb) {
    // 文件名: 时间戳-6位随机字符.文件后缀
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(-6)}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

const uploadSave = upload.fields([{ name: 'image' }, { name: 'avatar' }, { name: 'audio' }])

const uploadURLHandle = async ctx => {
  console.log('开始上传图片');
  let url = '';
  ['image', 'avatar', 'audio'].forEach((item) => {
    if (ctx.req.files[item]) {
      url = ctx.req.files[item][0].filename;
      // item === 'avatar' ? ctx.request.avatar = url : ctx.request[`${item}/Url`] = url;
      // 上传的图片的名字会返回，返回前端拿到名字再存储或者寻找。
      ctx.body = getResult(url)
    }
  })

}

module.exports = {
  uploadSave,
  uploadURLHandle
}



