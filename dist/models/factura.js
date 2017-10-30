'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO revisar este schema
var facturaSchema = new _mongoose2.default.Schema({
    tipo: String, //compra o venta
    recogido: String,
    material: String,
    comprador: String,
    vendedor: String,
    precio: Number

});

var Factura = _mongoose2.default.model('Factura', facturaSchema);

exports.default = Factura;