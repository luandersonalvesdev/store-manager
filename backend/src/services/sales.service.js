const { salesModel } = require('../models');

const SUCCESSFUL = 'SUCCESSFUL';
const NOT_FOUND = 'NOT_FOUND';

const getAll = async () => {
  const data = await salesModel.getAll();
  return { status: SUCCESSFUL, data };
};

const getById = async (idProduct) => {
  const data = await salesModel.getById(idProduct);
  if (!data.length) return { status: NOT_FOUND, data: { message: 'Sale not found' } };
  return { status: SUCCESSFUL, data };
};

module.exports = {
  getAll,
  getById,
};