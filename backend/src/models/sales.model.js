const snakeize = require('snakeize');
const camelizeArray = require('../utils/camelizeArray');
const connection = require('./connection');
const { formatedColumns, formatedValues } = require('../utils/formatedInsert');

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

const insert = async (sale) => {
  const querySale = 'INSERT INTO sales () VALUES ();';
  const [{ insertId }] = await connection.execute(querySale);

  const saleWithId = sale.map((saleObj) => ({ ...saleObj, saleId: insertId }));

  const promises = saleWithId.map(async (saleFull) => {
    const formatedColumsSale = formatedColumns(snakeize(saleFull));
    const formatedValuesSale = formatedValues(saleFull);
    const query = `
    INSERT INTO sales_products (${formatedColumsSale})
    VALUES (${formatedValuesSale})
    `;
    const [response] = await connection.execute(query, [...Object.values(saleFull)]);
    return response;
  });
  await Promise.all(promises);

  return { id: insertId, itemsSold: sale };
};

module.exports = {
  getAll,
  getById,
  insert,
};