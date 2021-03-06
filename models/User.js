const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  credits: { type: Number, default: 0 }
});

const User = mongoose.model('users', userSchema);

module.exports = User;