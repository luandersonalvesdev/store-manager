const joi = require('joi');
const { INVALID_DATA, BAD_REQUEST } = require('../../utils/namesStatusHttp');

const saleSchema = joi.array().items({
  productId: joi.number().integer().required(),
  quantity: joi.number().integer().greater(0).required(),
}).messages({
  'any.required': `${BAD_REQUEST}|"{#key}" is required`,
  'string.min': `${INVALID_DATA}|"{#key}" length must be at least 5 characters long`,
  'number.greater': `${INVALID_DATA}|"{#key}" must be greater than or equal to 1`,
});

const saleUpdateQuantitySchema = joi.object({
  quantity: joi.number().integer().greater(0).required(),
}).messages({
  'any.required': `${BAD_REQUEST}|"{#key}" is required`,
  'number.greater': `${INVALID_DATA}|"{#key}" must be greater than or equal to 1`,
});

module.exports = { saleSchema, saleUpdateQuantitySchema };