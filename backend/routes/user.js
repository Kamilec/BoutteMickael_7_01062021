const express = require('express');
const router = express.Router(); //Chargement du middleware niveau router
const auth = require('../middleware/auth'); //Appel du middleware d'authentification
const userCtrl = require('../controllers/users');
const multer = require('../middleware/multer-config'); //Appel du middleware pour la gestion des images

//Liage des routes aux controllers
router.put('/:id', auth, userCtrl.modifyPassword); //Modification du password utilisateur
router.put('/:id', auth, multer, userCtrl.modifyUser); //Modification d'un utilisateur
router.delete('/:id', auth, userCtrl.deleteUser); //Suppression d'un utilisateur

module.exports = router;