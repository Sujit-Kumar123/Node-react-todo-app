const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  desctiption: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// UserSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password, this.hash_password);
// };

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;