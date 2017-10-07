const config = require('./config/config'),
      restify = require('restify');

//console.log(restify.plugins);
server = restify.createServer({
  name: config.name,
  version: config.version
});

// routes
const  userRoutes = require('./routes/users');

//useful plugins
server.use(restify.plugins.pre.sanitizePath());
server.use(restify.plugins.bodyParser());

server.use(function(req,res, next) {
  console.log(req.method,': ',req.url);
  console.log('body:',req.body);
  next();
});


userRoutes.applyRoutes(server, '/user');

server.listen(config.port, function(){
  console.log('%s listening at %s', server.name, server.url);
});
