const db = require('../models/Index');
const User = db.users;
const Message = db.messages;
const Comment = db.comments;
const { Op } = require('sequelize');

// Routes CRUD : Create, Read, Update, Delete.

exports.findOneUser = (req, res, next) => {
  const userData = {};
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      userData.id = user.id;
      userData.pseudo = user.pseudo;
      userData.email = user.email;
      userData.createdAt = user.createdAt;
      userData.isAdmin = user.isAdmin;
    })
    .then(() => {
      Message.count({ where: { userId: req.params.id } }).then((total) => {
        userData.totalMessages = total;
      });
    })
    .then(() => {
      Comment.count({ where: { userId: req.params.id } }).then((total) => {
        userData.totalComments = total;
        res.status(200).json(userData);
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllUsers = (req, res, next) => {
  User.findAll({
    where: { id: { [Op.gt]: 0 } },
  })
    .then((found) => {
      res.status(200).json({ found });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
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


// params uid & isAdmin
exports.deleteOneUser = (req, res, next) => {
    console.log(" PROCESSUS DE SUPPRESSION DE L'UTILISATEUR ");
    console.log(" Utilisateur Id est: " + req.query.uid)
    console.log(" L'ID utilisateur qui demande la suppression est sAdmin : " + req.query.isAdmin);

    console.log(" Si isAdmin True => Supprimer l'utilisateur ")
    console.log(" Si False => Demande non autorisée ")
    
    console.log(req.query.isAdmin)
    if(req.query.isAdmin) {
        User.destroy({ where: { id: req.query.uid}})
        Message.destroy({ where: { UserId: req.query.uid }})
        Comment.destroy({ where: { UserId: req.query.uid }})
        .then((res) => {
            res.status(200).json({ message: "Messages ainsi que tous les commentaires ont été détruits" })
        })
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " Non autorisé "})
    }
}

exports.deleteMyAccount = (req, res, next) => {
    console.log(" PROCESSUS DE SUPPRESSION DE L'UTILISATEUR  ");
    console.log(" Utilisateur Id est: " + req.params.id)

    Comment.destroy({ where: { UserId: req.params.id }})
    Message.destroy({ where: { UserId: req.params.id }})
    User.destroy({ where: { id: req.params.id }}) 
    .then( () => res.status(200).json({message: "Ok!"}))
    .catch(error => console.log(error))
}
