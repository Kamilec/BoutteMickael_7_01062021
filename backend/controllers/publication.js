const Publication = require('../models/Publications'); //On importe le modèle de la publication
const fs = require('fs'); 

//Création d'une publication
exports.createPublication = (req, res, next) => {
  const publicationObject = JSON.parse(req.body.publication); //extraction objet JSON
  publicationObject.likes = 0;
  publicationObject.dislikes = 0;
  const publication = new Publication({
    ...publicationObject, //Utilise l'opérateur spread pour copier les infos du corps de la requête
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //On génère l'url par rapport à son nom de fichier
  });
  publication
    .save() //Sauvegarde de la nouvelle publication dans la bdd
    .then(() => res.status(201).json({ message: 'Publication enregistrée !' }))
    .catch((error) => res.status(400).json({ error }));
};

//Récupération d'une publication
exports.getOnePublication = (req, res, next) => {
  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//Modification d'une publication
exports.modifyPublication = (req, res, next) => {
  const publicationObject = req.file? {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };
  Publication.updateOne(
    { _id: req.params.id },
    { ...publicationObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Modified pulication !' }))
    .catch((error) => res.status(400).json({ error }));
};

//Suppression d'une publication
exports.deletePublication = (req, res, next) => {
  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      const filename = publication.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Publication.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Récupération de toutes les publications
exports.getAllPublication = (req, res, next) => {
  Publication.find()
    .then((publications) => {
      res.status(200).json(publications);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.likeDislikePublication = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const id = req.params.id;

  //Définir le statut de like (1,-1,0,defaut)
  switch (like) {
    case 1: //L'utilisateur aime la publication
      Publication.updateOne(
        { _id: id },
        {
          $inc: { likes: 1 }, //On incrémente les likes
          $push: { usersLiked: userId }, //On ajoute l'utilisateur au tableau usersLiked
        }
      )
        .then(() => res.status(201).json({ message: `You like the publication` }))
        .catch((error) => res.status(400).json({ error }));
      break;
    case -1: //L'utilisateur n'aime pas la publication
      Publication.updateOne(
        { _id: id },
        {
          $inc: { dislikes: 1 }, //On incrémente les dislikes
          $push: { usersDisliked: userId }, //On ajoute l'utilisateur au tableau usersDisliked
        }
      )
        .then(() => res.status(200).json({ message: `You dislike the publication` }))
        .catch((error) => res.status(400).json({ error }));
      break;
    case 0:
      Publication.findOne({ _id: id })
        .then((publication) => {
          if (publication.usersLiked.includes(userId)) {
            Publication.updateOne(
              { _id: id },
              {
                $inc: { likes: -1 }, //On décrémente likes
                $pull: { usersLiked: userId }, //On sort l'utilisateur du tableau usersLiked
                _id: req.params.id,
              }
            )
              .then(() => {
                res.status(200).json({
                  message: `You canceled the publication ${publication.name}`,
                });
              })
              .catch((error) => res.status(400).json({ error }));
          }
          if (publication.usersDisliked.includes(userId)) {
            Publication.updateOne(
              { _id: id },
              {
                $inc: { dislikes: -1 }, //On décrémentes dislikes
                $pull: { usersDisliked: userId }, //On sort l'utilisateur du tableau usersDisliked
              }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: `Vote canceled for publication ${publication.name}` })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(500).json({ error }));
      break;

    default:
      alert(`Please contact an administrator`);
      break;
  }
};