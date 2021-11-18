const { Sequelize, DataTypes } = require('sequelize');

// 引入数据库的配置信息
const { localDbInfo, aliDbInfo: { dbName, userName, password, host } } = require('../../encrypt/dbEncrypt')

// 连接数据库
const sequelize = new Sequelize(dbName, userName, password, host);

// 用以测试数据库是否连接成功
/* sequelize.authenticate().then(() => {
  console.log('sequzlize连接成功');
}).catch(err => {
  console.log(err);
}) */

module.exports = { sequelize, DataTypes };