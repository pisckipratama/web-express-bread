const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cretedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("User", UserSchema);