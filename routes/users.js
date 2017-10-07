const Router = require('restify-router').Router;
const router = new Router();
const User = require('../models/user');

function get_all(req, res, next) {
  console.log('gethey1');
  User.find()
    .then(users => {
      console.log('Users', users);
      res.send(200, { success: true, message: 'ok', data: users });
    })
    .catch(err => {
      console.error('hp',err);
      res.send(500, { success: false, message: 'Problem getting users' });
    });
  /*
  User.find(function(err, users) {
    if(err){
      //var e = new errors.InvalidContentError(err.errors.name.message)
      next(err);
      //res.send(500,{err: err});
    }
    console.log('hey2');
    res.send(200,{data: users});
    next();
  });
  */
}

function get_byId(req, res, next) {
  const id = req.params.id;
  User.findOne({id:id}, function(err, user) {
    if(err){
      //return next(new errors.InvalidContentError(err.errors.name.message));
      next(err);
    }
    res.send(200,{data: user});
  });
}

function post_user(req, res, next) {
  if(!req.is('application/json')) {
    console.log('hey post');
    //return next(new errors.InvalidContentError("Expects 'application/json'"));
    next();
  }
  console.log('hey post');
  var data = req.body || {};
  var user = new User(data);
  console.log('user:',user);

  user.save().
    then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  /*
  user.save(function(err) {
    if(err) {
      console.log('hey post err');
      //console.log(err);
      //return next(new errors.InternalError(err.message));
      next(err);
    }
    console.log('hey post after');
    res.send(201,{data: 'OK'});
    next();
  });*/
};

function put_user(req, res, next) {
  if(!req.is('application/json')) {
    res.send({message: "Expects 'application/json'"});
    next();
  }

  User.findOneAndUpdate(
    {'id': req.params.id},
    req.body,
    function(err, doc) {
      if(err) {
        //res.send(500,{err: err});
        next(err);
      }
      res.send(200,{data:'OK'});
      next();
    }
  );
};

function del_user(req, res, next) {
  User.remove(
    {'id': req.params.id},
    function(err) {
      if(err) {
        next(err);
      }
      res.send(200,{'data':'OK'});
      next();
    }
  );
};

router.get('/', get_all);
router.get('/:id', get_byId);
router.post('/', post_user);
router.put('/:id', put_user);
router.del('/:id', del_user);

module.exports = router;
