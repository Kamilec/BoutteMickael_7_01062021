const express = require('express');
const router = express.Router(); //Chargement du middleware niveau router
const auth = require('../middleware/auth');
const comments = require('../controllers/comments');
const multer = require('../middleware/multer-config'); //Appel du middleware pour la gestion des images


//Liage des routes aux controllers
router.post('/create', auth, multer, comments.createComment); // Création d'un commentaire
router.get('/all', auth, comments.getAllComments); // Récuparation des commentaires
router.get('/:id', auth, comments.getOneComment); // Récuparation d'un commentaire via son id
router.put('/update/:id', auth, comments.updateComment); // Update d'un commentaire
router.delete('/delete/:id', auth, comments.deleteComment); // Suppression d'un commentaire

module.exports = router;