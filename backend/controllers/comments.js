const db = require('../models/Index');
const Comment = db.comments;
const User = db.users;
const fs = require('fs');

//Création d'une publication
exports.createComment = (req, res, next) => {
  const commentObject = req.body.comment; //extraction objet JSON
  console.log(commentObject);
  commentObject.likes = 0;
  commentObject.dislikes = 0;
  const comment = new Comment({
    UserId: req.body.UserId,
    MessageId: req.body.MessageId,
    comment: req.body.comment,
  });
  comment
    .save() //Sauvegarde de la nouvelle publication dans la bdd
    .then(() => res.status(201).json({ message: 'Commentaire ajouté !' }))
    .catch((error) => res.status(400).json({ error }));
};

//Récupération de tous les commentaires
exports.findAllComments = (req, res, next) => {
  Comment.findAll()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//Récupération d'un commentaire
exports.findOneComment = (req, res, next) => {
  Comment.findOne({
    where: {
      MessageId: req.params.Messageid,
    },
    include: {
      model: User,
      required: true,
      attributes: ['Pseudo'],
    },
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => res.status(404).json({ error }));
};

//Modification d'un commentaire
exports.modifyComment = (req, res, next) => {
  const commentObject = req.file
    ? { ...JSON.parse(req.body.comment) }
    : { ...req.body };
  Comment.updateOne(
    { _id: req.params.id },
    { ...commentObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

//Suppression d'un Publication
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.query.commentId } })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
};

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
