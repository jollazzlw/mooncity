const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, PUBLIC_KEY } = require('../app/config')
const { getResult } = require('../routes/getSendMessage')

class AuthController {


  publish(ctx, user, maxTime = 60 * 60 * 30) {
    const { account, password, id } = user     //这个id是数据库里面拿到的user的主键的那个id
    // 颁发token
    const token = jwt.sign({ account, password, id }, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: maxTime
    })

    ctx.set('Authorization', token)
    ctx.body = getResult(token)
  }

  verifyToken = (ctx) => {

    console.log('verify token ing');
    const authorization = ctx.headers.authorization;
    console.log(authorization);
    if (!authorization) return    //未授权
    try {
      const token = authorization.replace('Bearer ', '');
      // 验证token
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256']
      });
      console.log('token verify success');
      return result;    //拿到现在登录的是那个用户
    } catch (err) {
      console.log('token not pass ');
      console.error(err);
      return
    }
  }

}
module.exports = new AuthController();