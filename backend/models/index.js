const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  username: dbConfig.USER,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: 3306,
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

db.users = require('./User.js')(sequelize, Sequelize);

module.exports = db;

