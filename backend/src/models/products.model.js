const connection = require('./connection');

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

module.exports = {
  getAll,
  getById,
};