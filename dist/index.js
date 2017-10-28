"use strict";

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _db = require('./models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = new _bunyan2.default({
  name: 'apibunyan',
  level: _config2.default.LOG_LEVEL || 'info',
  stream: process.stdout,
  serializers: _bunyan2.default.stdSerializers
});

var server = _restify2.default.createServer({
  name: _config2.default.name,
  version: _config2.default.version
  //log: log,
});

//useful plugins
server.use(_restify2.default.plugins.pre.sanitizePath());
server.use(_restify2.default.plugins.bodyParser());
server.use(_restify2.default.plugins.queryParser());

server.use(function (req, res, next) {
  //req.log.info({method: req.method, url:req.url, body:req.body}, 'start');
  next();
});

// Default error handler. Personalize according to your needs.
server.on('uncaughtException', function (req, res, route, err) {
  console.log('******* Begin Error *******');
  console.log(route);
  console.log('*******');
  console.log(err.stack);
  console.log('******* End Error *******');
  if (!res.headersSent) {
    return res.send(500, { ok: false });
  }
  res.write("\n");
  res.end();
});

//server.on('after', restify.plugins.auditLogger({ log: log}));
_users2.default.applyRoutes(server, '/user');

server.listen(_config2.default.port, function () {
  _db2.default.on('error', function (err) {
    console.error(err);
    process.exit(1);
  });

  _db2.default.once('open', function () {
    console.log(server.name + ', listening at ' + server.url);
  });
});