const snakeize = require('snakeize');

const snakeizeArray = (arr) => arr.map((obj) => snakeize(obj));

module.exports = snakeizeArray;