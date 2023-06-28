const express = require('express');
const { productsController } = require('../controllers');

const route = express.Router();

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);

module.exports = route;