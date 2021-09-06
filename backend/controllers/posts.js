const fs = require('fs');
const db = require('../models/');
const User = db.users;
const Posts = db.posts;
const Comment = db.comments;
const Op = db.Sequelize.Op;


// Récupération de tous les posts
exports.getAllsPosts = (req, res, next) => {
  Posts.findAll({
    include: ['comments'],
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

// Récupération d'un seul post
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  Posts.findByPk(id, {include: 'comments'})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Problème de récupération du commentaire avec l'id=" + id,
      });
    });
};

// Création d'un post
exports.createPost = (req, res, next) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    //comment : req.body.comment,
    userId: req.body.userId,
    like: 0,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    //image: req.body.image,
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
    Posts.findOne({ where: {id: postId }})
        .then(post => {
            post.update( {...req.body, id : req.params.id})
            .then(() => res.status(200).json({ message: 'Votre post a bien été modifié !'}))
            .catch(error => res.status(400).json({error}));
        }).catch(
            error => res.status(500).json({ error })
        )
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  Posts.findByPk(id, { include: 'user' })
    .then((post) => {
        if (post.image) {
          const filename = post.image.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Posts.destroy({ where: { id: id } })
              .then(() => res.status(200).json({ message: 'Post supprimé !' }))
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          Posts.destroy({ where: { id: id } })
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

// Ajout d'un like ou d'un dislike sur la publication
exports.likeDislikePost = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const id = req.params.id;

  //Définir le statut de like (1,-1,0,defaut)
  switch (like) {
    case 1: //L'utilisateur aime la publication
      Comment.updateOne(
        { _id: id },
        {
          $inc: { likes: 1 }, //On incrémente les likes
          $push: { usersLiked: userId }, //On ajoute l'utilisateur au tableau usersLiked
        }
      )
        .then(() =>
          res.status(201).json({ message: `Vous avez liké la publication` })
        )
        .catch((error) => res.status(400).json({ error }));
      break;
    case -1: //L'utilisateur n'aime pas la publication
      Comment.updateOne(
        { _id: id },
        {
          $inc: { dislikes: 1 }, //On incrémente les dislikes
          $push: { usersDisliked: userId }, //On ajoute l'utilisateur au tableau usersDisliked
        }
      )
        .then(() =>
          res.status(200).json({ message: `Vous avez disliké la publication` })
        )
        .catch((error) => res.status(400).json({ error }));
      break;
    case 0:
      Comment.findOne({ _id: id })
        .then((comment) => {
          if (comment.usersLiked.includes(userId)) {
            Comment.updateOne(
              { _id: id },
              {
                $inc: { likes: -1 }, //On décrémente likes
                $pull: { usersLiked: userId }, //On sort l'utilisateur du tableau usersLiked
                _id: req.params.id,
              }
            )
              .then(() => {
                res.status(200).json({
                  message: `Vous avez annulé votre like ${publication.name}`,
                });
              })
              .catch((error) => res.status(400).json({ error }));
          }
          if (comment.usersDisliked.includes(userId)) {
            Comment.updateOne(
              { _id: id },
              {
                $inc: { dislikes: -1 }, //On décrémentes dislikes
                $pull: { usersDisliked: userId }, //On sort l'utilisateur du tableau usersDisliked
              }
            )
              .then(() =>
                res.status(200).json({
                  message: `Vous avez annulé votre dislike ${comment.name}`,
                })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(500).json({ error }));
      break;

    default:
      alert(`Merci de contacter l'admin !`);
      break;
  }
};
