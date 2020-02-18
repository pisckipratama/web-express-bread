const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  string: {
    type: String,
  },
  integer: {
    type: Number,
  },
  float: {
    type: Number,
  },
  date: {
    type: String
  },
  boolean: {
    type: String
  }
})

let Data = module.exports = mongoose.model('data', dataSchema);
module.exports.get = function (callback, limit) {
  Data.find(callback).limit(limit);
}