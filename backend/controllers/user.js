const bcrypt = require('bcrypt'); //Hashage et salage des mots de passe
const jwt = require('jsonwebtoken'); //Création d'un token utilisateur
const User = require('../models/User');
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
  bcrypt
    .hash(req.body.password, 10) //Hashage du mot de passe et salage 10 fois
    .then((hash) => {
      const user = new User({
        email: MaskData.maskEmail2(req.body.email, emailMask2Options), //l'email masqué
        password: hash, //Mot de passe crypté
        username: req.body.username
      });
      console.log('user:' + user);
      user
        .save() //Sauvegarde du nouvel utilisateur dans la bdd
        .then(() => res.status(201).json({ message: 'User created !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Connexion d'un utilisateur existant
exports.login = (req, res, next) => {
  User.findOne({
    email: MaskData.maskEmail2(req.body.email, emailMask2Options), //Recherche de l'email correspondant
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'User not found !' });
      }
      bcrypt
        .compare(req.body.password, user.password) //Comparaison entre le mot de passe de la requête avec le hash de l'utilisateur
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              //Attribution d'un token d'authentification
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Modification d'un utilisateur
exports.modifyUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified user !' }))
    .catch((error) => res.status(400).json({ error }));
};

//Modification du password utilisateur
exports.modifyPassword = (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then((user) => {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          user
            .update({
              password: hash,
            })
            .then((user) => res.status(200).json(user))
            .catch((error) => res.status(400).json({ error: error }));
        })
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

//Suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        User.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'User deleted !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
