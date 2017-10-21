const Router = require('restify-router').Router;
const router = new Router();
const User = require('../models/user');

/* get all user */
function get_all(req, res, next) {
  User.find()
    .then(users => {
      res.send(200, { success: true, message: 'ok', data: users });
    })
    .catch(err => {
      res.send(500, { success: false, message: 'Problem getting users' });
    });
}

/* find user by cc */
function get_byId(req, res, next) {
  var id = req.params.id;
  User.findOne({ cc: id })
    .then(user => {
      res.send(200, { success: true, message: 'ok', data: user });
    })
    .catch(err => {
      res.send(500, { success: false, message: 'Problem getting user' });
    });
}

/* post a new user to database */
function post_user(req, res, next) {
  var data = req.body || {};
  var user = new User(data);
  User.create(data)
    .then(task => {
      res.send(200, task);
      next();
    })
    .catch(err => {
      res.send(500, err);
    });
}

/* Update user in database - find it by id  */
function put_user(req, res, next) {
  User.findOneAndUpdate({ cc: req.params.id }, req.body)
    .then(user => {
      res.send(200, { data: 'OK' });
      next();
    })
    .catch(() => {
      res.send(500, err);
    });
}

/* delete user by id */
function del_user(req, res, next) {
  User.deleteOne({ cc: req.params.id })
    .then(() => {
      res.send(200, { data: 'OK' });
    })
    .catch(() => {
      res.send(500, err);
    });
}

router.get('/', get_all);
router.get('/:id', get_byId);
router.post('/', post_user);
router.put('/:id', put_user);
router.del('/:id', del_user);

module.exports = router;
