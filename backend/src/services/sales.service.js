const { salesModel, productsModel } = require('../models');
const { SUCCESSFUL, NOT_FOUND, CREATED, NO_CONTENT } = require('../utils/namesStatusHttp');
const { saleSchema, saleUpdateQuantitySchema } = require('./validations/saleInput');
const convertDateToString = require('../utils/convertDate');

const getAll = async () => {
  const data = await salesModel.getAll();
  return { status: SUCCESSFUL, data };
};

const getById = async (idProduct) => {
  const data = await salesModel.getById(idProduct);
  if (!data.length) return { status: NOT_FOUND, data: { message: 'Sale not found' } };
  return { status: SUCCESSFUL, data };
};

const insert = async (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) {
    const [status, message] = error.message.split('|');
    return { status, data: { message } };
  }

  const products = sale.map((prod) => productsModel.getById(prod.productId));
  const result = await Promise.all(products);

  const productExists = result.some((res) => !res);

  if (productExists) return { status: NOT_FOUND, data: { message: 'Product not found' } };

  const data = await salesModel.insert(sale);
  return { status: CREATED, data };
};

const remove = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale.length) return { status: NOT_FOUND, data: { message: 'Sale not found' } };
  await salesModel.remove(id);
  return { status: NO_CONTENT, data: {} };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const { error } = saleUpdateQuantitySchema.validate({ quantity });
  if (error) {
    const [status, message] = error.message.split('|');
    return { status, data: { message } };
  }

  const saleExists = await salesModel.getById(saleId);
  if (!saleExists.length) return { status: NOT_FOUND, data: { message: 'Sale not found' } };

  const productExists = await productsModel.getById(productId);
  if (!productExists) return { status: NOT_FOUND, data: { message: 'Product not found in sale' } };

  await salesModel.updateQuantity(saleId, productId, quantity);
  const date = convertDateToString();
  const data = {
    date: date.toISOString(),
    productId: Number(productId),
    saleId: Number(saleId),
    quantity,
  };
  return { status: SUCCESSFUL, data };
};

module.exports = {
  getAll,
  getById,
  insert,
  remove,
  updateQuantity,
};