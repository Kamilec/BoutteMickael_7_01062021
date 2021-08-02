const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.js');
const strongPassword = require('../middleware/Password-Validator');

router.post('/signup', authCtrl.signup); // Inscription
router.post('/login', strongPassword, authCtrl.login); // Connexion

module.exports = router;