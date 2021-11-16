//首先加载node自带的加密模块
const crypto = require('crypto');

const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  return md5.update(password + '').digest('hex');   //update()  里面要是string
}

module.exports = md5password;