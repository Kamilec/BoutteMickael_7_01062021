const express = require('express');
const router = express.Router(); //Chargement du middleware niveau router
const auth = require('../middleware/auth'); //Appel du middleware d'authentification
const postCtrl = require('../controllers/posts');
const multer = require('../middleware/multer-config'); //Appel du middleware pour la gestion des images

//Liage des routes aux controllers
router.post('/', auth, multer, postCtrl.createPost); // Post - Création des messages avec les images.
router.get('/all/:id', postCtrl.findAllPostsForOne);
router.get('/:id', postCtrl.findOnePost);
router.get('/', postCtrl.findAllPosts);
router.delete('/', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likeDislikePost); //Liker et disliker une publication

module.exports = router;