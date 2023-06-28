const { productsModel } = require('../models');

const SUCCESSFUL = 'SUCCESSFUL';
const NOT_FOUND = 'NOT_FOUND';

const getAll = async () => {
  const data = await productsModel.getAll();
  return { status: SUCCESSFUL, data };
};

const getById = async (idProduct) => {
  const data = await productsModel.getById(idProduct);
  if (!data) return { status: NOT_FOUND, data: { message: 'Product not found' } };
  return { status: SUCCESSFUL, data };
};

module.exports = {
  getAll,
  getById,
};