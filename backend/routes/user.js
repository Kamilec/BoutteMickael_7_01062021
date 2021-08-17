module.exports = (app) => {
  const users = require('../controllers/users');
  const auth = require('../middleware/auth'); //Appel du middleware d'authentification

  var router = require('express').Router(); //Chargement du middleware niveau router

  //Liage des routes aux controllers
  router.post('/signup', users.signup); //Création utilisateur
  router.post('/login', users.login); //Connexion utilisateur
  router.put('/:id', auth, users.updateUser); //Modification d'un utilisateur
  router.delete('/:id', auth, users.deleteUser); //Suppression d'un utilisateur
  router.get('/:id', auth, users.getOneUser);//Récupération d'un utilisateur
  router.get('/', auth, users.getAllUser);//Récupération de tous les utilisateurs

  app.use('/api/user', router);
};