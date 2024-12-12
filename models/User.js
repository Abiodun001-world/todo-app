const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); // Corrected 'timestamp' to 'timestamps'

// Removed the pre-save hook that was hashing the password
// The password hashing will be done in the auth controller

module.exports = mongoose.model('User', UserSchema);