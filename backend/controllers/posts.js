const db = require('../models/');
const User = db.users;
const Posts = db.posts;
const Comment = db.comments;
const Op = db.Sequelize.Op;

//Création d'une publication
exports.createPost = (req, res, next) => {
  const post = {
    message: req.body.message,
    userId: req.body.userId,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  };
  Posts.create(post)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la création de la publication",
      });
    });
};

//Modification d'une publication
exports.modifyPost = (req, res, next) => {
  const id = req.params.id;
  const modification = req.file
    ? {
        message: req.body.message,
        userId: req.body.userId,
        image: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : {
        message: req.body.message,
        userId: req.body.userId,
      };

  Posts.update(modification, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "La publication est modifiée",
        });
      } else {
        res.send({
          message: `Update impossible pour la publication id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de maj de la publication id=" + id,
      });
    });
};

//Suppresion d'une publication
exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  Posts.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Publication supprimée!',
        });
      } else {
        res.send({
          message: `Suppression de la publication id=${id} impossbile.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la suppression de la publication id=" + id,
      });
    });
};

//Récupération d'une publication
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  Articles.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Problème de récupération de la publication id=" + id,
      });
    });
};

//Récupération de toutes les publications
exports.findAllPosts = (req, res, next) => {
  Posts.findAll({
    include: [{ model: User }],
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
        message: err.message || 'Erreur lors de la récupération des publications',
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
