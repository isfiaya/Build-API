const mongoose = require('mongoose');

const SaucesSchema = mongoose.Schema({
  userID: { type: String },
  name: { type: String, require: true },
  manufacturer: { type: String },
  description: { type: String },
  mainPepper: { type: String },
  imageUrl: { type: String },
  heat: { type: Number, min: 1, max: 10 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }],
});

module.exports = mongoose.model('Sauces', SaucesSchema);