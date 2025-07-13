import * as Joi from 'joi';

export const bodySchema = Joi.object({
  palletId: Joi.number().integer().positive().required().messages({
    'number.base': 'Pallet ID must be a number',
    'number.integer': 'Pallet ID must be an integer',
    'number.positive': 'Pallet ID must be positive',
    'any.required': 'Pallet ID is required',
  }),
  productId: Joi.number().integer().positive().required().messages({
    'number.base': 'Product ID must be a number',
    'number.integer': 'Product ID must be an integer',
    'number.positive': 'Product ID must be positive',
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
  expiryDate: Joi.date().iso().optional().messages({
    'date.format': 'Expiry date must be in ISO format (YYYY-MM-DD)',
    'date.base': 'Expiry date must be a valid date',
  }),
  manufactureDate: Joi.date().iso().max('now').optional().messages({
    'date.format': 'Manufacture date must be in ISO format (YYYY-MM-DD)',
    'date.base': 'Manufacture date must be a valid date',
    'date.max': 'Manufacture date cannot be in the future',
  }),
});

export const paramsSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required',
  }),
});

export const palletParamsSchema = Joi.object({
  palletId: Joi.number().integer().positive().required().messages({
    'number.base': 'Pallet ID must be a number',
    'number.integer': 'Pallet ID must be an integer',
    'number.positive': 'Pallet ID must be positive',
    'any.required': 'Pallet ID is required',
  }),
});

export const productParamsSchema = Joi.object({
  productId: Joi.number().integer().positive().required().messages({
    'number.base': 'Product ID must be a number',
    'number.integer': 'Product ID must be an integer',
    'number.positive': 'Product ID must be positive',
    'any.required': 'Product ID is required',
  }),
});

export const daysParamsSchema = Joi.object({
  days: Joi.number().integer().min(1).max(365).optional().default(7).messages({
    'number.base': 'Days must be a number',
    'number.integer': 'Days must be an integer',
    'number.min': 'Days must be at least 1',
    'number.max': 'Days must not exceed 365',
  }),
});

export const bodyEditSchema = Joi.object({
  quantity: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
  }),
  expiryDate: Joi.date().iso().optional().messages({
    'date.format': 'Expiry date must be in ISO format (YYYY-MM-DD)',
    'date.base': 'Expiry date must be a valid date',
  }),
  manufactureDate: Joi.date().iso().max('now').optional().messages({
    'date.format': 'Manufacture date must be in ISO format (YYYY-MM-DD)',
    'date.base': 'Manufacture date must be a valid date',
    'date.max': 'Manufacture date cannot be in the future',
  }),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});

export const bulkCreateSchema = Joi.object({
  palletProducts: Joi.array().items(bodySchema).min(1).required().messages({
    'array.min': 'At least one pallet product is required',
    'any.required': 'Pallet products array is required',
  }),
});
