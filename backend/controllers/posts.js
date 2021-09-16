const fs = require('fs');
const db = require('../models/');
const Posts = db.posts;
const User = db.users;

// Récupération de tous les posts
exports.getAllsPosts = (req, res, next) => {
  Posts.findAll({
    include: [
      { model: db.comments, as: 'comments', include: ['user'] },
      { model: User, attributes: ['pseudo'] },
    ],
    order: [
      ['updatedAt', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la récupération des posts',
      });
    });
};

// Création d'un post
exports.createPost = (req, res, next) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    userId: req.decoded.userId,
    like: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  };
  Posts.create(post)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la création de l'article ",
      });
    });
};  

// Update d'un post
exports.updatePost = (req, res) => {
  const postId = req.params.id;
  let id = req.decoded.userId;
  Posts.findByPk(postId).then((post) => {
    if (req.decoded.role === 'admin') id = post.userId
    const postObject = req.file
      ? {
          ...post,
          ...req.body,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...post, ...req.body };
    Posts.update({ ...postObject }, { where: { id: postId, userId: id } })
      .then(() => res.status(200).json({ message: 'Post modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  });
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  let id = req.decoded.userId;
  Posts.findByPk(postId)
    .then((post) => {
      if (req.decoded.role === 'admin') id = post.userId;
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Posts.destroy({ where: { id: postId, userId: id } })
            .then(() => res.status(200).json({ message: 'Post supprimé !' }))
            .catch((error) => {
              res.status(400).json({ error });
              console.log('sqdqsdqsdqsdqsdqsdqd', error);
            });
        });
      } else {
        Posts.destroy({ where: { id: postId, userId: id } })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
