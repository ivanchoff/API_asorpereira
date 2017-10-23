'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restifyRouter = require('restify-router');

var userRoutes = new _restifyRouter.Router();
//const User = require('../models/user');

function get_all(req, res, next) {
    console.log('get all');
    var data = [{ 'userall': 'jijiji' }, { 'sdfsd': 'asdfasdf' }];
    res.send(data);
    next();
}

function get_byId(req, res, next) {
    var id = req.params.id;
    var data = { 'user1': id };
    res.send(data);
    next();
}

function post_user(req, res, next) {
    if (!req.is('application/json')) {
        res.send({ message: "Expects 'application/json'" });
        next();
    }

    var userData = req.body || {};
    var user = new User(data);

    res.send(userData);
    next();
};

function put_user(req, res, next) {
    if (!req.is('application/json')) {
        res.send({ message: "Expects 'application/json'" });
        next();
    }

    var id = req.params.id;
    console.log(' id: ' + id + '\n UserData: ' + userData);
    res.send(200, { data: 'OK' });
    next();
};

function del_user(req, res, next) {
    var id = req.params.id;
    console.log('removing ' + id + ' user');
    res.send(200, { data: 'OK' });
    next();
};

userRoutes.get('/', get_all);
userRoutes.get('/:id', get_byId);
userRoutes.post('/', post_user);
userRoutes.put('/:id', put_user);
userRoutes.del('/:id', del_user);

exports.default = userRoutes;