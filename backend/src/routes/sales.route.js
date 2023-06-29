const express = require('express');
const { salesController } = require('../controllers');

const route = express.Router();

route.get('/', salesController.getAll);
route.post('/', salesController.insert);
route.get('/:id', salesController.getById);

module.exports = route;