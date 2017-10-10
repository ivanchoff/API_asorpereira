var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  cc: String
});

module.exports = mongoose.model('User',userSchema);
