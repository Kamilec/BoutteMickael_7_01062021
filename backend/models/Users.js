module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    pseudo: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(64),
    },
    avatar: {
      type: Sequelize.STRING,
      default: 'http://localhost:3000/images/defaultUser.jpg' 
    },
    role: {
      type: Sequelize.STRING,
    },
  });

  return User;
};