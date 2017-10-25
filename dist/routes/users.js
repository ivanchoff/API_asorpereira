'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _restifyRouter = require('restify-router');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoutes = new _restifyRouter.Router();
//const User = require('../models/user');

/* get all user */
function get_all(req, res, next) {
  _user2.default.find().exec().then(function (users) {
    res.send(200, { success: true, message: 'ok', data: users });
    next();
  }).catch(function (err) {
    res.send(500, { success: false, message: 'Problem getting users' });
    next();
  });
}

/* find user by cc */
function get_byId(req, res, next) {
  var id = req.params.id;
  _user2.default.findOne({ cc: id }).exec().then(function (user) {
    res.send(200, { success: true, message: 'ok', data: user });
    next();
  }).catch(function (err) {
    res.send(500, { success: false, message: 'Problem getting user' });
    next();
  });
}

/* post a new user to database */
function post_user(req, res, next) {
  var data = req.body || {};
  var user = new _user2.default(data);
  _user2.default.create(data)
  //.exec()
  .then(function (task) {
    res.send(200, task);
    next();
  }).catch(function (err) {
    res.send(500, err);
    next();
  });
}

/* Update user in database - find it by id  */
function put_user(req, res, next) {
  _user2.default.findOneAndUpdate({ cc: req.params.id }, req.body).exec().then(function (user) {
    res.send(200, { data: 'OK' });
    next();
  }).catch(function () {
    res.send(500, err);
    next();
  });
}

/* delete user by id */
function del_user(req, res, next) {
  _user2.default.findOneAndRemove({ cc: req.params.id }).exec().then(function () {
    res.send(200, { data: 'OK' });
    next();
  }).catch(function () {
    res.send(500, err);
    next();
  });
}

userRoutes.get('/', get_all);
userRoutes.get('/:id', get_byId);
userRoutes.post('/', post_user);
userRoutes.put('/:id', put_user);
userRoutes.del('/:id', del_user);

exports.default = userRoutes;