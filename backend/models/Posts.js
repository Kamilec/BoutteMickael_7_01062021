module.exports = (sequelize, Sequelize, user) => {
  const Posts = sequelize.define(
    'post',
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        unsigned: true,
        default: 0,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        requierd: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      tableName: 'Posts',
      freezeTableName: true,
    }
  );
  Posts.belongsTo(user, { foreignKey: 'userId', onDelete: 'cascade' });
  return Posts;
};
