const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
}).messages({
  'any.required': 'BAD_REQUEST|"{#key}" is required',
  'string.min': 'INVALID_DATA|"{#key}" length must be at least 5 characters long',
});

module.exports = productSchema;