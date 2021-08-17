const db = require('../models/');
const Comments = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;

//Création d'un commentaire
exports.createComment = (req, res, next) => {
  const comment = {
    message: req.body.message,
    postId: req.body.postId,
    userId: req.body.userId,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  };
  Comments.create(comment)
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la création du commentaire ",
      });
    });
};

//Modification d'un commentaire
exports.modifyComment = (req, res, next) => {
  const id = req.params.id;
  const modification = req.file
    ? {
        message: req.body.message,
        postId: req.body.postId,
        userId: req.body.userId,
        image: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : {
        message: req.body.message,
        postId: req.body.postId,
        userId: req.body.userId,
      };

  Comments.update(modification, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Le commentaire a été modifié',
        });
      } else {
        res.send({
          message: `Impossible d\'effectuer la maj du commentaire id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la maj du commentaire id=" + id,
      });
    });
};

//Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  const id = req.params.id;

  Comments.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Commentaire supprimé!',
        });
      } else {
        res.send({
          message: `Impossible de supprimer le commentaire id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la suppression du commentaire id=" + id,
      });
    });
};

//Récupération d'un commentaire
exports.getOneComment = (req, res, next) => {
  const id = req.params.id;
  Comments.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Problème de récupération du commentaire id=" + id,
      });
    });
};

//Récupération de tous les commentaires
exports.findAllComments = (req, res, next) => {
  Comments.findAll({
    where: {
      postId: req.params.postId    
    },
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
        message:
          err.message || 'Erreur lors de la récupération des commentaires',
      });
    });
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
