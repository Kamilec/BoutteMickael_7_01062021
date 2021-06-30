const express = require('express');
const router = express.Router(); //Chargement du middleware niveau router

const auth = require('../middleware/auth'); //Appel du middleware d'authentification

const publicationCtrl = require('../controllers/publication');
const multer = require('../middleware/multer-config'); //Appel du middleware pour la gestion des images

//Liage des routes aux controllers
router.post('/', publicationCtrl.createPublication); //Création d'une publication
router.put('/:id', auth, multer, publicationCtrl.modifyPublication); //Modification d'une publication existante
router.delete('/:id', auth, publicationCtrl.deletePublication); //Suppression d'une publication
router.get('/:id', auth, publicationCtrl.getOnePublication); //Récupération d'une seule publication
router.get('/', auth, publicationCtrl.getAllPublication); //Récupération de toutes les publications
router.post('/:id/like', auth, publicationCtrl.likeDislikePublication); //Liker et disliker une publication

module.exports = router;