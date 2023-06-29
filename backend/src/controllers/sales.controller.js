const { salesService } = require('../services');
const mapStatus = require('../utils/mapStatus');

const getAll = async (req, res) => {
  const { status, data } = await salesService.getAll();
  return res.status(mapStatus(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getById(id);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  getAll,
  getById,
};