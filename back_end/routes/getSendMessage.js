/* 
处理controller层的返回到客户端的结果
*/

exports.getErr = function (err = '服务器出错', errCode = 500) {
  return {
    code: errCode,
    msg: err
  }
}
exports.getResult = function (data) {
  console.log('success!!!');

  return {
    code: 200,
    msg: '成功',
    data           //这里是比较奇怪的，这里的data还是一个对象article{dataValues:{},_previousDataValues{}...},
    //而传到前端之后只有dataValues了
  }
}
/**
 * 
 * @param {*} ctx koa返回的对象
 * @param {*} result 返回的结果
 * @param {*} err 错误消息
 * @param {*} cb 回调
 */
exports.apiHandle = function (ctx, result, err, cb) {
  if (!result) {     //这里除了那6个假值,否则都进不来
    ctx.body = exports.getErr(err, 401)
  } else {
    ctx.body = exports.getResult(result)
    cb && cb(result)
  }
}