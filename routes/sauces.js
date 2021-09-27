/*LOGIQUE ROUTE POUR CE QUI CONCERNE LES REQUETES SUR LES SAUCES */
const express = require('express');
//Création d'un router Express qui contient toutes les routes des requêtes "Sauces"
const router = express.Router();
//Importation du controller
const saucesCtrl = require('../controllers/sauces');
//Importation du middleware d'autorisation pour protéger les routes
const auth = require('../middleware/auth');
//Importation du middleware indication de l'endroit où enregistrer les fichiers entrants et sous quel nom
const multer = require('../middleware/multer-config');

//Requête POST pour enregistrer une nouvelle sauce
router.post('/', auth, multer, saucesCtrl.createSauce);
//Requête GET pour récupérer la liste des sauces
router.get('/:id', auth, saucesCtrl.getOneSauce);
//Requête PUT pour modifier une sauce en particulier
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
//Requête DELETE pour supprimer une sauce en particulier
router.delete('/:id', auth, saucesCtrl.deleteSauce);
//Requête GET pour récupérer une sauce en particulier
router.get('/', auth, saucesCtrl.getAllSauces);
//Requête POST pour enregistrer un like/disklike
router.post('/:id/like', auth, saucesCtrl.likeOrDislikeSauce);
//Exportation du router
module.exports = router;