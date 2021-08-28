module.exports = {
  HOST: 'localhost',
  USER: 'Admin',
  PASSWORD: 'Admin',
  DB: 'dbgm',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
