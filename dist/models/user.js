'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Revisar este schema
var userSchema = new _mongoose2.default.Schema({
  name: String,
  cc: String,
  direccion: String,
  telefono: Number,
  email: String,
  tipo: String
});

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;