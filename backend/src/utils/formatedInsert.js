const formatedColumns = (obj) => Object.keys(obj).join(', ');

const formatedValues = (obj) => Object.keys(obj).map((_key) => '?').join(', ');

const formatedUpdate = (obj) => Object.keys(obj).map((key) => `${key} = ?`).join(', ');

module.exports = {
  formatedColumns,
  formatedValues,
  formatedUpdate,
};