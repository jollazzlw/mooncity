// 导入模块，用来建立关系
const Article = require('./tables/article');
const ArticleComment = require('./tables/articleComment')
const Classify = require('./tables/classify')
const MyWord = require('./tables/myWord')
const User = require('./tables/user')

/* 
A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C
下面通过创建一个 '关系表like' 将Article 和 user 连接起来了,articleId和userId坐标外键连接起来了
*/
Article.belongsToMany(User, { through: 'like', foreignKey: 'articleId' })
User.belongsToMany(Article, { through: 'like', foreignKey: 'userId' })

/* 
A.hasMany(B);   // A 有多个 B  外键应该在目标模型中
A.belongsTo(B)  // A 属于 B，关联意味着 A 和 B 之间存在一对一的关系,外键在源模型中定义(A).
*/
Classify.hasMany(Article, {
  foreignKey: 'classifyId'
})
Article.belongsTo(Classify)


// 一篇文章可以有多个评论
Article.hasMany(ArticleComment, {
  foreignKey: 'articleId'
})
ArticleComment.belongsTo(Article)


// 一个用户可以评论多篇文章
User.hasMany(ArticleComment, {
  foreignKey: 'userId'
})
ArticleComment.belongsTo(User)

// 一个用户可以留言多次
User.hasMany(MyWord, {
  foreignKey: 'userId'
})
MyWord.belongsTo(User)