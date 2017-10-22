"use strict";
import restify from 'restify';
import config from './config/config';
import bunyan from 'bunyan';

const log = new bunyan({
  name       : 'apibunyan',
  level      : config.LOG_LEVEL || 'info',
  stream     : process.stdout,
  serializers: bunyan.stdSerializers
});

const server = restify.createServer({
  name: config.name,
  version: config.version
  //log: log,
});


//useful plugins
server.use(restify.plugins.pre.sanitizePath());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());


server.use((req, res, next) => {
  //req.log.info({method: req.method, url:req.url, body:req.body}, 'start');
  next();
});

// Default error handler. Personalize according to your needs.
server.on('uncaughtException', (req, res, route, err) => {
  console.log('******* Begin Error *******');
  console.log(route);
  console.log('*******');
  console.log(err.stack);
  console.log('******* End Error *******');
  if (!res.headersSent) {
    return res.send(500, { ok : false });
  }
  res.write("\n");
  res.end();
});

//server.on('after', restify.plugins.auditLogger({ log: log}));

server.listen(config.port, function() {
  console.log(`${server.name}, listening at ${server.url}`);
});
