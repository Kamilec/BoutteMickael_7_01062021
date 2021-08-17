const db = require('../models/');
const User = db.users;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
/*const MaskData = require('maskdata');*/

//Masquage de l'email
/*const emailMask2Options = {
  maskWith: '*',
  unmaskedStartCharactersBeforeAt: 0,
  unmaskedEndCharactersAfterAt: 0,
  maskAtTheRate: false,
};*/
//Output: ********@**********

//Routes CRUD : Create, Read, Update, Delete

//Inscription utilisateur
let role = '';
exports.signup = (req, res) => {
  if (req.body.email === process.env.Admin_email) {
    role = 'admin';
  } else {
    role = 'user';
  }
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      pseudo: req.body.pseudo,
      email: req.body.email,
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
            "Une erreur est survenue lors de la création de l'utilisateur.",
        });
        
      });
  });
};

//Connexion utilisateur
exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } else {
              res.status(201).json({
                id: user.id,
                role: user.role,
                pseudo: user.pseudo,
                token: jwt.sign(
                  { id: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: "8h"}),
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      }

    })
    .catch(error => res.status(500).json({ error }));
};

//Update utilisateur
exports.updateUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const id = req.params.id;
    const newProfile = req.body
      ? {
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
        }
      : {
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
        };
    User.update(newProfile, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: 'Mise à jour utilisateur modifiée.',
          });
        } else {
          res.send({
            message: `Impossible de modifier l'utilisateur avec l'id=${id}!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Erreur lors de la mise à jour id=' + id,
        });
      });
  });
};

//Suppression utilisateur
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Utilisateur supprimé!',
        });
      } else {
        res.send({
          message: `Impossible de supprimer id=${id}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Impossible de supprimer l\'utilisateur id=' + id,
      });
    });
};

//Récupération d'un utilisateur
exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Erreur lors de la récupération de l\'utilisateur id=' + id,
      });
    });
};

//Récupération de tous les utilisateurs
exports.getAllUser = (req, res, next) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Une erreur s\'est produite lors de la récupération des utilisateurs',
      });
    });
};