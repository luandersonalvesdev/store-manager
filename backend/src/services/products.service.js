const { productsModel } = require('../models');
const productSchema = require('./validations/productInput');

const SUCCESSFUL = 'SUCCESSFUL';
const NOT_FOUND = 'NOT_FOUND';
const CREATED = 'CREATED';

const getAll = async () => {
  const data = await productsModel.getAll();
  return { status: SUCCESSFUL, data };
};

const getById = async (idProduct) => {
  const data = await productsModel.getById(idProduct);
  if (!data) return { status: NOT_FOUND, data: { message: 'Product not found' } };
  return { status: SUCCESSFUL, data };
};

const insert = async (product) => {
  const { error } = productSchema.validate(product);
  if (error) {
    const [status, message] = error.message.split('|');
    return { status, data: { message } };
  }
  const data = await productsModel.insert(product);
  return { status: CREATED, data };
};

module.exports = {
  getAll,
  getById,
  insert,
};