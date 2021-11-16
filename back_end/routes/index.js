const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors'); //跨域处理


// 引入总路由
const router = require('./api')


const app = new Koa()
const port = 5006

app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      const whiteList = ['http://localhost:8081', 'http://localhost:5006']; //可跨域白名单
      let url = ctx.header.origin;
      if (whiteList.includes(url)) {
        return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
      }
      return 'http://localhost:8080' //默认允许本地请求8080端口可跨域
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Authorization'] //设置获取其他自定义字段
  })
);

// 应用token中间件，验证一些需要token的请求
app.use(require("../middleware/tokenMiddleware"));

// 用来解析json和urlencoded数据， 解析的数据存放在ctx.request.body
app.use(bodyParser())


app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(port, () => {
  console.log(`开始监听${port}端口`)
})