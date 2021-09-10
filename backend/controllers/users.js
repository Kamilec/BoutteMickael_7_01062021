const bcrypt = require('bcrypt'); //Hashage et salage des mots de passe
const jwt = require('jsonwebtoken'); //Création d'un token utilisateur
const MaskData = require('maskdata');
const fs = require('fs');

const db = require('../models/');
const User = db.users;
const Posts = db.posts;

//Masquage de l'email
const emailMask2Options = {
  maskWith: '*',
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false,
};

//Output: xxx*****@********xx

// Création utilisateur
exports.signup = (req, res, next) => {
  let role = '';
  if (req.body.email === 'admin@groupomania.com') {
    role = 'admin';
  } else {
    role = 'user';
  }
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      pseudo: req.body.pseudo,
      email: MaskData.maskEmail2(req.body.email, emailMask2Options),
      role: role,
      password: hash,
    };
    User.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Une erreur s'est produite lors de la création de l'utilisateur.",
        });
      });
  });
};

// Connexion utilisateur
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: MaskData.maskEmail2(req.body.email, emailMask2Options) },
  })
    .then((user) => {
      console.log(user.id);
      if (!user) {
        return res.status(401).json({ error });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe erroné !' });
            } else {
              res.status(200).json({
                userId: user.id,
                role: user.role,
                pseudo: user.pseudo,
                avatar: user.avatar,
                token: jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
                  expiresIn: '24h',
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error: 'Aucun utilisateur enregistré avec cet email' })
    );
};

// Récupération utilisateur
exports.getOneUser = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// logique métier : modifier un utilisateur
exports.updateUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...req.body.userId,
        avatar: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user.avatar != null) {  
        const filename = user.avatar.split('/images/')[1];
        return fs.unlinkSync(`images/${filename}`); 
      }
    })
    .then(() =>
      User.update(
        { ...userObject, id: req.params.id },
        { where: { id: req.params.id } }
      )
    )
    .then(() => res.status(200).json({ ...userObject }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression profil utilisateur
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  Posts.findAll({ where: { userId: id } }).then((posts) => {
    posts.forEach((post) => {
      if (post.image != '') {
        const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Posts.destroy({ where: { id: post.id } }).catch((error) =>
            res.status(400).json({ error })
          );
        });
      } else {
        Posts.destroy({ where: { id: post.id } }).catch((error) =>
          res.status(400).json({ error })
        );
      }
    });
    User.findOne({
      where: { id: req.params.id },
    }).then((user) => {
      if (user.image != null) {
        const filename = user.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          User.destroy({ where: { id: req.params.id } })
            .then(() =>
              res.status(200).json({ message: 'Utilisateur supprimé !' })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        User.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: 'Utilisateur supprimé !' })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    });
  });
};
