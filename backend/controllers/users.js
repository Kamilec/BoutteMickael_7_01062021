const bcrypt = require('bcrypt'); //Hashage et salage des mots de passe
const jwt = require('jsonwebtoken'); //Création d'un token utilisateur
const MaskData = require('maskdata');
const fs = require('fs');

const db = require('../models/');
const User = db.users;
const Comments = db.comments;
const Posts = db.posts

//Masquage de l'email
const emailMask2Options = {
  maskWith: '*',
  unmaskedStartCharactersBeforeAt: 0,
  unmaskedEndCharactersAfterAt: 0,
  maskAtTheRate: false,
};

//Output: ********@**********

// Création utilisateur
exports.signup = (req, res, next) => {
  const pseudo = req.body.pseudo;
  const email = req.body.email;
  const password = req.body.password;
  let role = "";
  if (req.body.email === "admin@groupomania.com"){
    role = "admin"
  }else {
    role = "user"
  }
   User.findOne({
     attributes: ['email'],
     where: { email: email },
   })
     .then((userFound) => {
       if (!userFound) {
         bcrypt.hash(password, 10).then((hash) => {
           const user = new User({
             pseudo: pseudo,
             email: email,
             /*imageProfil: `${req.protocol}://${req.get('host')}/images/${
               req.file.filename
             }`,*/
             password: hash,
             role: role,
           });
           user
             .save()
             .then(() =>
               res.status(201).json({ message: 'Utilisateur créé !' })
             )
             .catch((error) => res.status(400).json({ error }));
         });
       } else if (userFound) {
         return res.status(409).json({ error: "L'utilisateur existe déjà !" });
       }
     })
     .catch((error) => res.status(500).json({ error }));
};


// Connexion utilisateur
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then((user) => {
      console.log(user.id);
      if (!user) {
        return res.status(401).json({ error });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe erroné !' });
            } else {
              res.status(200).json({
                userId: user.id,
                role: user.role,
                pseudo: user.pseudo,
                token: jwt.sign(
                  { userId: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: "24h"}),
              });
            }
          })
          .catch(error => res.status(500).json({ error  }));
      }
    })
    .catch(error => res.status(500).json({ error : 'Aucun utilisateur enregistré avec cet email' }));
};

// Récupération tous utilisateurs
exports.getAllUsers = (req, res, next) => {
  console.log(user);
  User.findAll()
  .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
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
        //image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        image: req.body.image,
      }
    : { ...req.body };
  User.update(
    { ...userObject, id: req.params.id },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ ...userObject }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression profil utilisateur
exports.deleteUser = (req, res, next) => {
  Comments.destroy({ where: { userId: req.params.id } })
    .then(() =>
      Posts.findAll({ where: { userId: req.params.id } })
        .then((posts) => {
          posts.forEach((post) => {
            Comments.destroy({ where: { postId: post.id } });
            Posts.destroy({ where: { id: post.id } });
          });
        })
        .then(() =>
          User.findOne({ where: { id: req.params.id } }).then((user) => {
            const filename = user.image;
            fs.unlink(`images/${filename}`, () => {
              User.destroy({ where: { id: req.params.id } }).then(() =>
                res.status(200).json({ message: 'Utilisateur supprimé !' })
              );
            });
          })
        )
    )

    .catch((error) => res.status(400).json({ error }));
};