const { sequelize, DataTypes } = require('../db');// 导入连接号的数据库 和 指定数据库数据的类型
const moment = require('moment')             //日期处理的库
// 文章的评论
const ArticleComment = sequelize.define('articleComment', {
  floorId: {
    type: DataTypes.INTEGER
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
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},
  {
    freezeTableName: true
  }
)
module.exports = ArticleComment;