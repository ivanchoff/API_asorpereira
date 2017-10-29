"use strict";

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _rest_generator = require('./routes/rest_generator');

var _rest_generator2 = _interopRequireDefault(_rest_generator);

var _db = require('./models/db');

var _db2 = _interopRequireDefault(_db);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _ruta = require('./models/ruta');

var _ruta2 = _interopRequireDefault(_ruta);

var _factura = require('./models/factura');

var _factura2 = _interopRequireDefault(_factura);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Guarda los logs de la aplicacion


// Base de datos
var log = new _bunyan2.default({
  name: 'apibunyan',
  level: _config2.default.LOG_LEVEL || 'info',
  stream: process.stdout,
  serializers: _bunyan2.default.stdSerializers
});

// Rutas


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

// Carga las colecciones y los paths de estas, luego se podria cambiar pares o algo mas ordenado
var collections = [_user2.default, _ruta2.default, _factura2.default];
var paths = ['/user', '/ruta', '/factura'];
// Toma el servidor y aplica las rutas
(0, _rest_generator2.default)(server, collections, paths);

server.listen(_config2.default.port, function () {
  _db2.default.on('error', function (err) {
    console.error(err);
    process.exit(1);
  });

  _db2.default.once('open', function () {
    console.log(server.name + ', listening at ' + server.url);
  });
});