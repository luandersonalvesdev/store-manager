const { salesModel } = require('../models');
const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../utils/namesStatusHttp');

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
  const data = await salesModel.insert(sale);
  return { status: CREATED, data };
};

module.exports = {
  getAll,
  getById,
  insert,
};