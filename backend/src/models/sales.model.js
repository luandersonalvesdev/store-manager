const camelizeArray = require('../utils/camelizeArray');
const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
  FROM sales_products AS sp
  LEFT JOIN sales AS s
  ON sp.sale_id = s.id;
  `;
  const [result] = await connection.execute(query);
  return camelizeArray(result);
};

const getById = async (idProduct) => {
  const query = `
  SELECT sp.product_id, sp.quantity, s.date
  FROM sales_products AS sp
  LEFT JOIN sales AS s
  ON sp.sale_id = s.id
  WHERE sale_id = ?;
  `;
  const [result] = await connection.execute(query, [idProduct]);
  return camelizeArray(result);
};

module.exports = {
  getAll,
  getById,
};