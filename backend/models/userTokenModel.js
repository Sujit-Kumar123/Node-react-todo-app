const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    trim: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
});

const UserToken = mongoose.model('UserToken', UserTokenSchema);

module.exports = UserToken;