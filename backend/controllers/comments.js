const db = require('../models/');
const Comments = db.comments;


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
    userId: req.decoded.userId,
  };
  Comments.create(comment)
    .then((data) => {
      res.status(201).json({ message: 'Commentaire créé !' });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  const id = req.decoded.userId;
  const comment = req.params.id;
  console.log(id, comment);
  Comments.destroy({ where: { id: comment, /* userId:id  */} })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
};

// Modification d'un commentaire
exports.updateComment = (req, res, next) => {
  const comment = req.params.id;
  const id = req.decoded.userId;
  Comments.findOne({where: {id: comment }})
    .then((comment) => {
      comment
        .update({...req.body, where: { id: req.params.id, userId : id}})
        .then((comment) => res.status(200).json(comment))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};