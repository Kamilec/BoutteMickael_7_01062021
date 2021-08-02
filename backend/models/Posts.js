const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

  Post.init(
    {
      post: {
        type: DataTypes.TEXT,
      },
      postUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
