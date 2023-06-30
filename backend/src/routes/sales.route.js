const express = require('express');
const { salesController } = require('../controllers');

const route = express.Router();

route.get('/', salesController.getAll);
route.post('/', salesController.insert);
route.get('/:id', salesController.getById);
route.delete('/:id', salesController.remove);
route.put('/:saleId/products/:productId/quantity', salesController.updateQuantity);

module.exports = route;