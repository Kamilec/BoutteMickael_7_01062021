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

db.posts.hasMany(db.comments, { as: 'comments' });
db.comments.belongsTo(db.posts, {
  foreignKey: 'postId',
  as: 'posts',
});


module.exports = db;