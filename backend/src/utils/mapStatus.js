const mapStatus = {
  SUCCESSFUL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  INVALID_DATA: 422,
  BAD_REQUEST: 400,
};

module.exports = (status) => mapStatus[status] || 500;