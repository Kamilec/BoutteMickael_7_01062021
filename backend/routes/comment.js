module.exports = (app) => {
  var router = require('express').Router(); //Chargement du middleware niveau router
  const multer = require('../middleware/multer-config');
  const comments = require('../controllers/comments');
  const auth = require('../middleware/auth'); //Appel du middleware d'authentification

  router.post('/', auth, multer, comments.createComment); //Création d'un commentaire
  router.put('/:id', auth, multer, comments.modifyComment); //Update d'un commentaire
  router.delete('/:id', auth, comments.deleteComment); //Suppression d'un commentaire
  router.get('/:id', auth, comments.getOneComment); //Récupération d'un commentaire via son orderId
  router.get('/', auth, comments.findAllComments); //Récupération de tous les commentaires
  router.post('/:id/like', auth, commentCtrl.likeDislikeComment); //Liker et disliker une publication

  app.use('/api/comments', router);
};