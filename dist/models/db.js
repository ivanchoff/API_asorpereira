'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.db.uri, { useMongoClient: true });

var db = _mongoose2.default.connection;

db.on('connected', function () {
  console.log('connected to database');
});

db.on('disconnected', function () {
  console.log('disconnected from database');
});

db.on('error', function (e) {
  console.log('database error:', e);
});

// close mongoose db if Node process end
process.on('SIGINT', function () {
  db.close(function () {
    console.log('closed db of mongoose');
  });
  process.exit(0);
});

exports.default = db;