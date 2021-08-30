const db = require('../models/');
const Comments = db.comments;
const User = db.users;


// Récupération de tous les commentaires
exports.getAllComments = (req, res) => {
  Comments.findAll({ include: ['user'] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Une erreur est survenue lors de la récupération des posts',
      });
    });
};


// Récupération d'un commentaire
exports.getOneComment = (req, res, next) => {
  const id = req.params.id;
  Comments.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Problème de récupération du commentaire avec l'id=" + id,
      });
    });
};

// Création d'un commentaire
exports.createComment = (req, res, next) => {
  const comment = {
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.body.userId,
  };
  Comments.create(comment)
    .then((data) => {
      res.status(201).json({ message: 'Commentaire créé !' });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  Comments.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
};

// Modification d'un commentaire
exports.updateComment = (req, res, next) => {
  Comments.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((comment) => {
      comment
        .update({
          ...req.body,
          where: {
            id: req.params.id,
          },
        })
        .then((comment) => res.status(200).json(comment))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};

// Ajout d'un like ou d'un dislike sur les publications
exports.likeDislikeComment = (req, res, next) => {
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
