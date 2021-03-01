const mongoose = require('mongoose');

const SaucesSchema = mongoose.Schema({
  userID: {
    type: String,
  },
  name: {
    type: String,
    require: true
  },
  manufacturer: {
    type: String,
  },
  description: {
    type: String,
  },
  mainPepper: {
    type: String,
  },
  imageUrl: {
    type: String,
    require: true
  },
  heat: {
    type: Number,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
  usersLiked: {
    type: String,
  },
  usersDisliked: {
    type: String,
  },
});

module.exports = mongoose.model('Sauces', SaucesSchema);