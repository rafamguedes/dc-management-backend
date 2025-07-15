import * as Joi from 'joi';

const bodySchema = Joi.object({
  sectorId: Joi.number().integer().positive().required().messages({
    'number.base': 'Sector ID must be a number',
    'number.integer': 'Sector ID must be an integer',
    'number.positive': 'Sector ID must be a positive number',
    'any.required': 'Sector ID is required',
  }),
  code: Joi.string().min(1).max(10).required().messages({
    'string.base': 'Code must be a string',
    'string.empty': 'Code cannot be empty',
    'string.min': 'Code must have at least 1 character',
    'string.max': 'Code must have at most 10 characters',
    'any.required': 'Code is required',
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

const sectorParamsSchema = Joi.object({
  sectorId: Joi.number().integer().positive().required().messages({
    'number.base': 'Sector ID must be a number',
    'number.integer': 'Sector ID must be an integer',
    'number.positive': 'Sector ID must be a positive number',
    'any.required': 'Sector ID is required',
  }),
});

const bodyEditSchema = Joi.object({
  sectorId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Sector ID must be a number',
    'number.integer': 'Sector ID must be an integer',
    'number.positive': 'Sector ID must be a positive number',
  }),
  code: Joi.string().min(1).max(10).optional().messages({
    'string.base': 'Code must be a string',
    'string.empty': 'Code cannot be empty',
    'string.min': 'Code must have at least 1 character',
    'string.max': 'Code must have at most 10 characters',
  }),
  description: Joi.string().max(500).optional().allow('').messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must have at most 500 characters',
  }),
});

export { bodySchema, paramsSchema, sectorParamsSchema, bodyEditSchema };
