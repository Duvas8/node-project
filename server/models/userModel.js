const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Number,
  maxActions: Number,
  roles: {String: Number}
  
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

module.exports = User;