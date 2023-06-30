const { productsService } = require('../services');
const mapStatus = require('../utils/mapStatus');

const getAll = async (req, res) => {
  const { status, data } = await productsService.getAll();
  return res.status(mapStatus(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getById(id);
  return res.status(mapStatus(status)).json(data);
};

const insert = async (req, res) => {
  const product = req.body;
  const { status, data } = await productsService.insert(product);
  return res.status(mapStatus(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;
  const { status, data } = await productsService.update(id, newProduct);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
};