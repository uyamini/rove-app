// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String
});

module.exports = mongoose.model('User', userSchema);