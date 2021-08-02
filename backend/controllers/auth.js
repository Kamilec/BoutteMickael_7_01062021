const db = require('../models/Index')
const User = db.users;
const bcrypt = require('bcrypt'); //Hashage et salage des mots de passe
const jwt = require('jsonwebtoken'); //Création d'un token utilisateur
const MaskData = require('maskdata');

//Masquage de l'email
const emailMask2Options = {
  maskWith: '*',
  unmaskedStartCharactersBeforeAt: 0,
  unmaskedEndCharactersAfterAt: 0,
  maskAtTheRate: false,
};

//Output: ********@**********

//Enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  if (!req.body.pseudo || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Un ou plusieurs paramètre vides' });
  }
  const nameRegex = /(.*[a-z]){3,30}/;
  const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (nameRegex.test(req.body.pseudo) && mailRegex.test(req.body.email) && passwordRegex.test(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10) //Hashage du mot de passe et salage 10 fois
      .then((hash) => {
        const user = {
          email: MaskData.maskEmail2(req.body.email, emailMask2Options), //Email masqué
          password: hash, //Mot de passe crypté 
          pseudo: req.body.pseudo,
          imageUrl: req.body.filename,
        };
        User.create(user)
          // .save() //Sauvegarde du nouvel utilisateur dans la bdd
          .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

//Connexion d'un utilisateur existant
exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Un ou plusieurs paramètre vides' });
  }
  User.findOne({
    email: MaskData.maskEmail2(req.body.email, emailMask2Options), //Recherche de l'email correspondant
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Email non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password) //Comparaison entre le mot de passe de la requête avec le hash de l'utilisateur
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Password non valable !' });
          }
          res.status(200).json({
            message: 'Connexion réussie',
            userId: user.id,
            role: user.isAdmin,
            pseudo: user.pseudo,
            token: jwt.sign({ userId: user.id }, process.env.TKN_SECRET, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};