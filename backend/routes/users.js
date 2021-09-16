const express = require('express');
const router = express.Router(); // Chargement du middleware niveau router
const multer = require('../middleware/multer-config'); // Appel du middleware pour la gestion des images
const strongPassword = require('../middleware/Password-Validator');
const auth = require('../middleware/auth');
const users = require('../controllers/users');

//Liage des routes aux controllers
router.post('/signup', strongPassword, multer, users.signup); // Création profil utilisateur
router.post('/login', users.login); // Connexion profil utilisateur
router.get('/all', auth, users.getAllUsers); // Récupération tous les profils utilisateurs
router.get('/:id', auth, users.getOneUser); // Récupération profil utilisateur
router.put('/update/:id', auth, multer, users.updateUser); // MAJ profil utilisateur
router.delete('/delete/:id', auth, multer, users.deleteUser); // Suppression profil utilisateur

module.exports = router;