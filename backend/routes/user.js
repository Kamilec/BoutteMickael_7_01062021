const express = require('express');
const router = express.Router(); //Chargement du middleware niveau router

const auth = require('../middleware/auth'); //Appel du middleware d'authentification

const userCtrl = require('../controllers/user');
const strongPassword = require('../middleware/Password-Validator');
const multer = require('../middleware/multer-config'); //Appel du middleware pour la gestion des images


router.post('/signup', strongPassword, multer, userCtrl.signup); //Création d'un nouvel utilisateur
router.post('/login', strongPassword, userCtrl.login); //Connexion d'un utilisateur existant
router.put('/:id', auth, userCtrl.modifyPassword); //Modification du password utilisateur
router.put('/:id', auth, multer, userCtrl.modifyUser); //Modification d'un utilisateur
router.delete('/:id', auth, userCtrl.deleteUser); //Suppression d'un utilisateur

module.exports = router;
