// Création du serveur avec le framework Express
const express = require('express'); //Importation du framewrok express pour node.js
const bodyParser = require('body-parser');
const path = require('path'); //Accès aux chemins des fichiers

// Modules de sécurité
const helmet = require('helmet'); // Aide à sécuriser les applications Express en définissant divers en-têtes HTTP
require('dotenv').config();//Module indépendant qui charge les variables d'environnement
const hpp = require('hpp'); // Protection contre les attaques des paramètres HTTP
const cors = require('cors'); // Middleware CORS - Ajout de HEADERS à l'objet "response"

// Importation des routes
const usersRoutes = require('./routes/users'); //Importation du routeur pour les utilisateurs
const postsRoutes = require('./routes/posts'); //Importation du routeur pour les publications
const commentsRoutes = require('./routes/comments'); //Importation du routeur pour les commentaires

// Lancement du framework express
const app = express(); 

// Gestion CORS - Middleware permettant d'accéder à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //Indication que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  ); //Indication que les en-têtes seront utilisées après la pré-vérification cross-origin
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  ); //Indication des méthodes autorisées pour les requêtes HTTP
  next();
}); 
app.use(cors()); // Middleware CORS - Ajout de HEADERS à l'objet "response"
app.use(helmet()); // Protection d'Express en définissant divers en-têtes HTTP
app.use(hpp()); // Protection contre les attaques des paramètres HTTP                  

// Package body-parser 
app.use(bodyParser.json()); // Middleware qui permet de parser les requêtes par le client (extraction de l'ojbet JSON à la demande) on peut y accèder grâce à req.body
app.use(bodyParser.urlencoded());  

// Permet au dossier "images" d'être statique
app.use('/images', express.static(path.join(__dirname, 'images'))); //Middleware qui permet de charger les fichiers qui sont dans le répertoire image

//Connexion à la base de données MySql   
const db = require('./models');
//db.sequelize.sync();  
db.sequelize.sync({ force: true });

// Middleware qui va permettre la transimission des requêtes vers ces url aux routes correspondantes
app.use('/user', usersRoutes);
app.use('/post', postsRoutes);
app.use('/comment',commentsRoutes);

module.exports = app;