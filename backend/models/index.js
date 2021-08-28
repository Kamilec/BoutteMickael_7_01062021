const dbConfig = require('../config/db.config.js');

require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./Users.js')(sequelize, Sequelize);
db.posts = require('./Posts.js')(sequelize, Sequelize, db.users);
db.comments = require('./Comments.js')(sequelize, Sequelize, db.users, db.posts);

/* // association table posts et users
db.users.hasMany(db.post, { as: "post" });
db.posts.belongsTo(db.user, {
  foreignKey: "userId",
  as: "posts",
});
//association table comments à users
db.users.hasMany(db.comments, { as: "comment" });
db.comments.belongsTo(db.user, {
  foreignKey: "userId",
  as: "comments",
});
//association table comment à posts
db.posts.hasMany(db.comment, { as: "comment" });
db.comments.belongsTo(db.posts, {
  foreignKey: "postId",
  as: "post",
}); */

module.exports = db;