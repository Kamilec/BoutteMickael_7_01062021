const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //Extraction du token de la requête
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //Décryptage token grâce à la clé secrète
    const userId = decodedToken.userId;
    console.log(userId);
    console.log(decodedToken);
    if (parseInt(req.body.userId) !== userId) {
      return res.status(401).json({ error: 'ID utilisateur non valable !' });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !' });
  }
};