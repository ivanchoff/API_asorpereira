const config = require('./config/config'),
      restify = require('restify');
      db = require('./models/db');

//console.log(restify.plugins);
server = restify.createServer({
  name: config.name,
  version: config.version
});


//useful plugins
server.use(restify.plugins.pre.sanitizePath());
server.use(restify.plugins.bodyParser());

server.use(function(req,res, next) {
  console.log('PRE:',req.method,': ',req.url);
  console.log('PRE: body:',req.body);
  next();
});


server.listen(config.port, function(){
// establish connection to mongodb
  db.on('error', err => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    // routes
    const  userRoutes = require('./routes/users');
    userRoutes.applyRoutes(server, '/user');
    console.log('%s listening at %s', server.name, server.url);
    //console.log(`Server is listening on port ${config.port}`);
  });

});
