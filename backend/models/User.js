const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
