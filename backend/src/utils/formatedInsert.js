const formatedColumns = (obj) => Object.keys(obj).join(', ');

const formatedValues = (obj) => Object.keys(obj).map((_key) => '?').join(', ');

module.exports = {
  formatedColumns,
  formatedValues,
};