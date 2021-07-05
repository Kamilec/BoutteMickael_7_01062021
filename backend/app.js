const express = require('express'); //Importation du framewrok express pour node.js
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user'); //Importation du routeur pour les utilisateurs
const publicationRoutes = require('./routes/publication'); //Importation du routeur pour les publication
const path = require('path'); //Accès aux chemins des fichiers
const helmet = require('helmet'); // Aide à sécuriser les applications Express en définissant divers en-têtes HTTP

const app = express(); //Appliquation du framework express

app.use(helmet.contentSecurityPolicy()); // Atténue les attaques des scripts intersites.
app.use(helmet.dnsPrefetchControl()); // Aide à contrôler la prélecture DNS, ce qui peut améliorer la confidentialité des utilisateurs au détriment des performances.
app.use(helmet.expectCt()); // Aide à atténuer les certificats SSL mal émis.
app.use(helmet.frameguard()); // Aide à atténuer les attaques de détournement de clic.
app.use(helmet.hidePoweredBy()); // Supprime l'en-tête X-Powered-By, qui est défini par défaut dans certains frameworks (comme Express).
app.use(helmet.hsts()); // Indique aux navigateurs de préférer HTTPS à HTTP non sécurisé.
app.use(helmet.ieNoOpen()); // Internet Ex8 - Il force l'enregistrement des téléchargements potentiellement dangereux, ce qui atténue l'exécution du HTML dans le contexte de votre site.
app.use(helmet.noSniff()); // Cela atténue le reniflement de type MIME* qui peut entraîner des failles de sécurité.// * Le type Multipurpose Internet Mail Extensions (type MIME) est un standard permettant d'indiquer la nature et le format d'un document.
app.use(helmet.permittedCrossDomainPolicies()); // Indique à certains clients (principalement des produits Adobe) la politique de votre domaine pour le chargement du contenu interdomaine.
app.use(helmet.referrerPolicy()); // Définit l'en-tête Referrer-Policy qui contrôle les informations définies dans l'en-tête Referer.
app.use(helmet.xssFilter()); // Désactive le filtre de script intersite bogué des navigateurs en définissant l'en-tête X-XSS-Protection sur 0.

//Module indépendant qui charge les variables d'environnement
require('dotenv').config();

//Connexion à la base de données MySql
const db = require('./models');
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

//Middleware permettant d'accéder à l'API depuis n'importe quelle origine
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

app.use(bodyParser.json()); //Middleware qui permet de parser les requêtes par le client, on peut y accèder grâce à req.body

app.use('/images', express.static(path.join(__dirname, 'images'))); //Middleware qui permet de charger les fichiers qui sont dans le répertoire image
app.use('/api/publication', publicationRoutes); //Middleware qui va permettre la transimission des requêtes vers ces url aux routes correspondantes
app.use('/api/auth', userRoutes);

module.exports = app;
