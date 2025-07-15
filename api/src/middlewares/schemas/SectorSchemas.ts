import * as Joi from 'joi';

const bodySchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least 2 characters',
    'string.max': 'Name must have at most 50 characters',
    'any.required': 'Name is required',
  }),
  description: Joi.string().max(500).optional().allow('').messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must have at most 500 characters',
  }),
});

const paramsSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is required',
  }),
});

const bodyEditSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least 2 characters',
    'string.max': 'Name must have at most 50 characters',
  }),
  description: Joi.string().max(500).optional().allow('').messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must have at most 500 characters',
  }),
});

export { bodySchema, paramsSchema, bodyEditSchema };
