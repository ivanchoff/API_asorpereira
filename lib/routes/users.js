import { Router } from 'restify-router';
import User from '../models/user';

const userRoutes = new Router();
//const User = require('../models/user');

/* get all user */
function get_all(req, res, next) {
  User.find()
    .exec()
    .then(users => {
      res.send(200, { success: true, message: 'ok', data: users });
      next();
    })
    .catch(err => {
      res.send(500, { success: false, message: 'Problem getting users' });
      next();
    });
}

/* find user by cc */
function get_byId(req, res, next) {
  var id = req.params.id;
  User.findOne({ cc: id })
    .exec()
    .then(user => {
      res.send(200, { success: true, message: 'ok', data: user });
      next();
    })
    .catch(err => {
      res.send(500, { success: false, message: 'Problem getting user' });
      next();
    });
}

/* post a new user to database */
function post_user(req, res, next) {
  var data = req.body || {};
  var user = new User(data);
  User.create(data)
    //.exec()
    .then(task => {
      res.send(200, task);
      next();
    })
    .catch(err => {
      res.send(500, err);
      next();
    });
}

/* Update user in database - find it by id  */
function put_user(req, res, next) {
  User.findOneAndUpdate({ cc: req.params.id }, req.body)
    .exec()
    .then(user => {
      res.send(200, { data: 'OK' });
      next();
    })
    .catch(() => {
      res.send(500, err);
      next();
    });
}

/* delete user by id */
function del_user(req, res, next) {
  User.findOneAndRemove({ cc: req.params.id })
    .exec()
    .then(() => {
      res.send(200, { data: 'OK' });
      next();
    })
    .catch(() => {
      res.send(500, err);
      next();
    });
}

userRoutes.get('/', get_all);
userRoutes.get('/:id', get_byId);
userRoutes.post('/', post_user);
userRoutes.put('/:id', put_user);
userRoutes.del('/:id', del_user);

export default userRoutes;
