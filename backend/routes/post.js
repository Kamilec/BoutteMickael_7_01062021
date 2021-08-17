module.exports = (app) => {
  const multer = require('../middleware/multer-config');//Chargement du middleware pour la gestion des images
  var router = require('express').Router(); //Chargement du middleware niveau router
  const posts = require('../controllers/posts'); //Chargement du middleware niveau post
  const auth = require('../middleware/auth'); //Chargement du middleware d'authentification

  //Liage des routes aux controllers
  router.post('/', auth, multer, posts.createPost); //Création d'une publication
  router.put('/:id', auth, multer, posts.modifyPost); //Update d'une publication
  router.delete('/:id', auth, posts.deletePost); //Suppression de la publication
  router.get('/:id', auth, posts.getOneArticle); //Récupération d'une publication via son orderId
  router.get('/', auth, posts.findAllPosts);//Récupération de toutes les publications
  router.post('/:id/like', auth, posts.likeDislikePost); //Liker et disliker une publication

  app.use('/api/articles', router);
};;