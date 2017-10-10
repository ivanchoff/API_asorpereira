const mongoose = require('mongoose'),
      config = require('../config/config');
//mongoose.connect(config.db.uri,{useMongoClient: true});
mongoose.Promise = require('bluebird');

//mongoose.set('debug',true);
mongoose.set('debug',function (coll, method, query, doc,options) {
  console.log('db log:',coll, method, query, doc,options);
});

var connection = mongoose.createConnection(config.db.uri,{useMongoClient: true});

connection.on('connected',function() {
  console.log('connected');
});


connection.on('disconnected',function() {
  console.log('disconnected');
});


connection.on('error',function(e) {
  console.log('database error:',e);
});

//test for saving document --- fail
connection.once('open', () => {
  User = require('./user.js');
  console.log('open connection inside db');
  var user = new User({
    name : 'choff',
    cc: '887'
  });
  console.log(user);
  user.save(function(e){
    if(e)
      console.log('ERRORR');
    else
      console.log('SAVED');
  });

});

// close mongoose connection if Node process end

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('closed connection of mongoose');
  });
  process.exit(0);
});


module.exports = connection;
