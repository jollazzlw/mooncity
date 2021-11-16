const Router = require('koa-router')

const { addComment, getCommentList } = require('../../controller/artComment.controller')

const artComRouter = new Router()



artComRouter.post('/addArtCom', addComment)

artComRouter.post('/getArtComList', getCommentList)

module.exports = artComRouter