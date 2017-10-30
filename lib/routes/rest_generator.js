import { Router } from 'restify-router';

//Las rutas se generan con funciones currificadas
//se retorna una funcion utilizando las colecciones
//que se envian

const getAll = (Collection) => (req, res, next) => {
    Collection.find()
    .exec()
    .then(item => {
        res.send(200, { success: true, message: 'ok', data: item });
        next();
    })
    .catch(err => {
        res.send(500, { success: false, message: 'Problem getting users' });
        next();
    });
}

const getOne = (Collection) => (req, res, next) => {
    const id = req.params.id;
    Collection.findOne({ _id: id })
    .exec()
    .then(item => {
        res.send(200, { success: true, message: 'ok', data: item });
        next();
    })
    .catch(err => {
        res.send(500, { success: false, message: 'Problem getting user' });
        next();
    });
}

const post = (Collection) => (req, res, next) => {
    const data = req.body || {};
    const newItem = new Collection(data);
    Collection.create(data)
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

const put = (Collection) => (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    Collection.findOneAndUpdate({ _id: id }, data)
    .exec()
    .then(item => {
        res.send(200, { data: 'OK' });
        next();
    })
    .catch(() => {
        res.send(500, err);
        next();
    });
}

const del = (Collection) => (req, res, next) => {
    const id = req.params.id;
    Collection.findOneAndRemove({ _id: id })
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

// Aca se generan las rutas como tal segun la coleccion y se retornan
const generateRoutes = (Collection) => {
    const routes = new Router();

    routes.get('/', getAll(Collection));
    routes.get('/:id', getOne(Collection));
    routes.post('/', post(Collection));
    routes.put('/:id', put(Collection));
    routes.del('/:id', del(Collection));
    return routes;
}

// por cada coleccion y ruta se generan las rutas y se hace un zip con los paths
// para que se apliquen al servidor
const applyRoutes = (server, collections, paths) => {
    const routes = collections.map(collection => generateRoutes(collection));
    routes.map((route, index) => route.applyRoutes(server, paths[index]));
}

export default applyRoutes;
