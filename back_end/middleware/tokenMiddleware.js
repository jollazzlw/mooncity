const { getErr } = require("../routes/getSendMessage");
const { pathToRegexp } = require("path-to-regexp");   //url字符串的正则表达式
const jwt = require('../utils/jwt')

const needTokenApi = [
  { method: "POST", path: "/article/addArticle" },
  { method: "GET", path: "/user/profile" },
  { method: "GET", path: "/user/getHomeInfo" },
  { method: "POST", path: "/user/updateUserInfo" },
  { method: "POST", path: "/upload" },
  { method: "POST", path: "/articleComment/addArtCom" },


];

module.exports = async (ctx, next) => {
  const apis = needTokenApi.filter(api => {
    const reg = pathToRegexp(api.path)
    return api.method === ctx.method && reg.test(ctx.path)
  })
  if (apis.length === 0) {   //访问的都不是需要验证token的url
    await next()
    return
  }
  // 访问的是需要验证token的url,我们就验证它
  const result = jwt.verifyToken(ctx)

  // 当通过token验证的时候,判断是不是到这些获取个人用户信息的地址，
  //如果是的话拿到这个用户的id, 存入ctx.request.userId，这也方便等会获取
  if (result) {
    ctx.request.userId = result.id
    await next()
  } else {
    handleNonToken(ctx)
  }
}
//处理没有认证的情况
function handleNonToken(ctx) {
  ctx.status = 403
  ctx.body = getErr('您还没有登陆', 403)
}