require('./tables/article');
require('./tables/articleComment')
require('./tables/classify')
require('./tables/myWord')
require('./tables/user')
require('./relation')
require('./modelSync')

const { sequelize } = require('./db');
(async () => {
  // await sequelize.sync({ force: true }) // 这个是清空数据库同步
  await sequelize.sync({ alter: true });    // 只查看修改的地方并进行同步
  console.log('所有模型同步完毕!');
})()