'use strict';

var mongoose = require('mongoose'),
    config = require('../config/config');
//mongoose.connect(config.db.uri,{useMongoClient: true});
mongoose.Promise = require('bluebird');
var connection = mongoose.createConnection(config.db.uri, { useMongoClient: true });

connection.on('connected', function () {
  console.log('connected');
});

connection.on('disconnected', function () {
  console.log('disconnected');
});

connection.on('error', function (e) {
  console.log('database error:', e);
});

// close mongoose connection if Node process end

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('closed connection of mongoose');
  });
  process.exit(0);
});

module.exports = mongoose.connection;