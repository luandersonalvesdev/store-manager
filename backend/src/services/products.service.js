const { productsModel } = require('../models');
const productSchema = require('./validations/productInput');
const { SUCCESSFUL, NOT_FOUND, CREATED, NO_CONTENT } = require('../utils/namesStatusHttp');

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

const update = async (id, newProduct) => {
  const { error } = productSchema.validate(newProduct);
  if (error) {
    const [status, message] = error.message.split('|');
    return { status, data: { message } };
  }

  const productExists = await productsModel.getById(id);

  if (!productExists) return { status: NOT_FOUND, data: { message: 'Product not found' } };
  await productsModel.update(id, newProduct);
  return { status: SUCCESSFUL, data: { id: Number(id), ...newProduct } };
};

const remove = async (id) => {
  const productExists = await productsModel.getById(id);
  if (!productExists) return { status: NOT_FOUND, data: { message: 'Product not found' } };
  await productsModel.remove(id);
  return { status: NO_CONTENT, data: {} };
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};