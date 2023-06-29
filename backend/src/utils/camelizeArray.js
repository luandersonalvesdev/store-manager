const camelize = require('camelize');

const camelizeArray = (arr) => arr.map((obj) => camelize(obj));

module.exports = camelizeArray;