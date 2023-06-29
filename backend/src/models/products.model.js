const connection = require('./connection');
const { formatedColumns, formatedValues } = require('../utils/formatedInsert');

const getAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id;';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (idProduct) => {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [[result]] = await connection.execute(query, [idProduct]);
  return result;
};

const insert = async (product) => {
  const columns = formatedColumns(product);
  const values = formatedValues(product);
  const query = `
  INSERT INTO products (${columns})
  VALUES (${values})
  `;
  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);
  return { id: insertId, ...product };
};

module.exports = {
  getAll,
  getById,
  insert,
};