const express = require('express');
const router = express.Router(); //Chargement du middleware niveau router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); //Appel du middleware pour la gestion des images
const posts = require('../controllers/posts');

//Liage des routes aux controllers
router.post('/create', auth, multer, posts.createPost); // Création d'un post
router.get('/all', auth, posts.getAllsPosts); // Récuparation de tous les posts
router.put('/update/:id', auth, multer, posts.updatePost); // Modification d'un post
router.delete('/delete/:id', auth, multer, posts.deletePost); // Supprimer un post 

module.exports = router;