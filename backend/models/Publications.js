//Création d'un schéma de données grâce à mongoose avec les propriétés désirées
const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
  username: { type: String, required: true },
  comments: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
});

//Exportation en tant que modèle
module.exports = mongoose.model('Publication', publicationSchema);
