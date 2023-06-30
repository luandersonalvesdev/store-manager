const { salesModel, productsModel } = require('../models');
const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../utils/namesStatusHttp');
const saleSchema = require('./validations/saleInput');

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

module.exports = {
  getAll,
  getById,
  insert,
};