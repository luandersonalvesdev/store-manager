const mapStatus = {
  SUCCESSFUL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
};

module.exports = (status) => mapStatus[status] || 500;