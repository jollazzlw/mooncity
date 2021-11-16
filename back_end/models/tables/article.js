const { sequelize, DataTypes } = require('../db');// 导入连接号的数据库 和 指定数据库数据的类型

const moment = require('moment')             //日期处理的库

const Article = sequelize.define('article', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  musicUrl: {
    type: DataTypes.STRING
  },
  musicName: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  visitsNum: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likeNum: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  },

},
  {
    freezeTableName: true    //固定表名字 ,强制表明等于模型名 [Article],不行是会进行模型名的复数
  }
)
module.exports = Article
