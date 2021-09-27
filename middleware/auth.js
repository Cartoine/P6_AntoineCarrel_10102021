/*MIDDLEWARE D'AUTHENTIFICATION */

//Importation du package qui permet de créer et de vérifier les tokens d'authentification 
const jwt = require('jsonwebtoken');
//Importation du modèles User
const User = require('../models/User');

module.exports = (req, res, next) => {
  try {
    //Récupération du token contenu dans les headers
    const token = req.headers.authorization.split(' ')[1]; //récupération du token depuis le header Authorization
    //Décodage du token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //Extraction de l'id contenu dans le token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      User.findOne({ _id: userId })
        .then(user => {
          req.user = user;
          next();
        })
    }
  } catch(error) {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    });
  }
};