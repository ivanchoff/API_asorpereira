'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restifyRouter = require('restify-router');

//Las rutas se generan con funciones currificadas
//se retorna una funcion utilizando las colecciones
//que se envian

var getAll = function getAll(Collection) {
    return function (req, res, next) {
        Collection.find().exec().then(function (item) {
            res.send(200, { success: true, message: 'ok', data: item });
            next();
        }).catch(function (err) {
            res.send(500, { success: false, message: 'Problem getting users' });
            next();
        });
    };
};

var getOne = function getOne(Collection) {
    return function (req, res, next) {
        var id = req.params.id;
        Collection.findOne({ _id: id }).exec().then(function (item) {
            res.send(200, { success: true, message: 'ok', data: item });
            next();
        }).catch(function (err) {
            res.send(500, { success: false, message: 'Problem getting user' });
            next();
        });
    };
};

var post = function post(Collection) {
    return function (req, res, next) {
        var data = req.body || {};
        var newItem = new Collection(data);
        Collection.create(data)
        //.exec()
        .then(function (task) {
            res.send(200, task);
            next();
        }).catch(function (err) {
            res.send(500, err);
            next();
        });
    };
};

var put = function put(Collection) {
    return function (req, res, next) {
        var id = req.params.id;
        var data = req.body;
        Collection.findOneAndUpdate({ _id: id }, data).exec().then(function (item) {
            res.send(200, { data: 'OK' });
            next();
        }).catch(function () {
            res.send(500, err);
            next();
        });
    };
};

var del = function del(Collection) {
    return function (req, res, next) {
        var id = req.params.id;
        Collection.findOneAndRemove({ _id: id }).exec().then(function () {
            res.send(200, { data: 'OK' });
            next();
        }).catch(function () {
            res.send(500, err);
            next();
        });
    };
};

// Aca se generan las rutas como tal segun la coleccion y se retornan
var generateRoutes = function generateRoutes(Collection) {
    var routes = new _restifyRouter.Router();

    routes.get('/', getAll(Collection));
    routes.get('/:id', getOne(Collection));
    routes.post('/', post(Collection));
    routes.put('/:id', put(Collection));
    routes.del('/:id', del(Collection));
    return routes;
};

// por cada coleccion y ruta se generan las rutas y se hace un zip con los paths
// para que se apliquen al servidor
var applyRoutes = function applyRoutes(server, collections, paths) {
    var routes = collections.map(function (collection) {
        return generateRoutes(collection);
    });
    routes.map(function (route, index) {
        return route.applyRoutes(server, paths[index]);
    });
};

exports.default = applyRoutes;