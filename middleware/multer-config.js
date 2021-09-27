/*MIDDLEWARE DE TELECHARGEMENT D'IMAGE */

//Importation du package multer, qui permet le téléchargement de fichiers
const multer = require('multer');

//Dictionnaire d'extensions possibles pour les images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//indication de l'endroit où enregistrer les fichiers entrants et sous quel nom
const storage = multer.diskStorage({
  //Fonction qui explique à multer dans quel dossier iront les fichiers téléchargés
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //Création d'un nom de fichier unique
  filename: (req, file, callback) => {
    //On prend le nom original de la photo mais on enlève les espaces
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    //Création nom final : nom original sans espaces + timestamp + point + extension
    callback(null, name + Date.now() + '.' + extension);
  }
});
//Exportation de multer, en précisant quon stocke un fichier unique et non un groupe, et qu'il s'agit d'une image
module.exports = multer({storage: storage}).single('image');