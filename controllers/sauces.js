/* REQUETES SUR LES SAUCES */
//Importation du package fs, qui permet entre autres de supprimer des fichiers
const fs = require('fs');
//Importation du modèles Sauce 
const Sauce = require('../models/Sauces');
//Fontion qui gère la logique de la route POST (ajout d'une nouvelle sauce)
exports.createSauce = (req, res, next) => {
      //Création d'un objet réponse (constitué de "sauce" et de "image") qu'on met au format json et qu'on passe en même temps au filtre xss-filters
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    //Expression dynamique pour recréer l'adresse url pour trouver le fichier téléchargé récupéré par multer
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
};
//Fontion qui gère la logique métier de la route PUT (modification d'une sauce existante)
exports.modifySauce = (req, res, next) => {
      //Création d'un objet réponse qu'on interroge pour savoir s'il y a un fichier image à télécharger ou non
  const sauceObject = req.file ?
    {
      //Si oui, on récupère la partie "sauce" de l'objet réponse qu'on met en json
      ...JSON.parse(req.body.sauce),
       //Expression dynamique pour recréer l'adresse url pour trouver le fichier téléchargé récupéré par multer
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    //On met à jour en remplaçant les données mais en gardant le même id
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};
//Fontion qui gère la logique métier de la route DELETE (suppression d'une sauce existante)
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    //Récupération du nom de fichier à la fin de l'URL
    const filename = sauce.imageUrl.split('/images/')[1];
    //Suppression du fichier image stocké par multer via une expression dynamique
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};
//Fontion qui gère la logique métier de la route GET (récupération de toutes les sauces)
exports.getAllSauces = (req, res, next) => {
 Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};
//Fontion qui gère la logique métier de la route GET (récupération d'une sauce spécifique)
exports.likeOrDislikeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      sauce.likeOrDislike(req.body.like, req.user._id)
      sauce.save()
      .then(() => res.status(201).json({message: 'Avis enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
    });
};