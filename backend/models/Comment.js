module.exports = (sequelize, Sequelize, user, post) => {
  const Comments = sequelize.define(
    'comments',
    {
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      postId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        requierd: true,
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
      tableName: 'comments',
      freezeTableName: true,
    }
  );
  Comments.belongsTo(user, { foreignKey: 'userId', onDelete: 'cascade' });
  Comments.belongsTo(post, {
    foreignKey: 'postId',
    onDelete: 'cascade',
  });
  return Comments;
};
