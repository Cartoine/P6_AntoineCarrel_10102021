//Importation du package mongoose pour communication optimale avec mongoDB
const mongoose = require('mongoose');

//Création du schéma pour la ressource "sauce"
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },
});

sauceSchema.methods.likeOrDislike = function(like, user) {
  const wantsToLike    = !this.alreadyLikedFrom(user) && like === 1
  const wantsToDislike = !this.alreadyDislikedFrom(user) && like === -1
  const wantsToUnvote  = like === 0

  if (wantsToLike)         this.receiveLikeFrom(user)
  else if (wantsToDislike) this.receiveDislikeFrom(user)
  else if (wantsToUnvote)  this.resetLikesFrom(user)
}

sauceSchema.methods.alreadyLikedFrom = function(id) {
  return this.usersLiked.find(userId => userId.equals(id));
}

sauceSchema.methods.alreadyDislikedFrom = function(id) {
  return this.usersDisliked.find(userId => userId.equals(id));
}

sauceSchema.methods.receiveLikeFrom = function(user) {
  this.likes += 1;
  this.usersLiked.push(user)
}

sauceSchema.methods.receiveDislikeFrom = function(user) {
  this.dislikes += 1;
  this.usersDisliked.push(user)
}

sauceSchema.methods.resetLikesFrom = function(user) {
  if (this.alreadyLikedFrom(user)) {
    this.removeLikeFrom(user)
  } else if (this.alreadyDislikedFrom(user)) {
    this.removeDislikeFrom(user)
  }
}

sauceSchema.methods.removeLikeFrom = function(user) {
  this.likes -= 1
  this.usersLiked = this.usersLiked.filter(userId => !userId.equals(user))
}

sauceSchema.methods.removeDislikeFrom = function(user) {
  this.dislikes -= 1
  this.usersDisliked = this.usersDisliked.filter(userId => !userId.equals(user))
}



module.exports = mongoose.model('Sauce', sauceSchema);