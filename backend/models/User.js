
// 📄 server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  resetToken: String,
  resetTokenExpiry: Date,
});

module.exports = mongoose.model('User', userSchema);

