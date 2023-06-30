const express = require('express');
const { productsController } = require('../controllers');

const route = express.Router();

route.get('/', productsController.getAll);
route.get('/search/', productsController.getByName);
route.post('/', productsController.insert);
route.put('/:id', productsController.update);
route.get('/:id', productsController.getById);
route.delete('/:id', productsController.remove);

module.exports = route;