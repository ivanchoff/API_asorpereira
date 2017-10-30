'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO Revisar este schema
var rutaSchema = new _mongoose2.default.Schema({
  responsable: String,
  nombre: String,
  descripcion: String,
  frecuencia: Number
});

var Ruta = _mongoose2.default.model('Ruta', rutaSchema);

exports.default = Ruta;