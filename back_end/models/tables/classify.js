const { sequelize, DataTypes } = require('../db');// 导入连接号的数据库 和 指定数据库数据的类型
const moment = require('moment')

const Classify = sequelize.define('classify', {
  name: {  //留言用户的ID
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},
  {
    freezeTableName: true    //固定表名字 ,强制表明等于模型名 [Article],不行是会进行模型名的复数
  })
module.exports = Classify;