const { sequelize, DataTypes } = require('../db');// 导入连接号的数据库 和 指定数据库数据的类型
const moment = require('moment')             //日期处理的库
/* 留言 */
const MyWord = sequelize.define('myword', {
  userId: { // 留言用户ID
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},
  {
    freezeTableName: true // 固定表名字
  })
module.exports = MyWord