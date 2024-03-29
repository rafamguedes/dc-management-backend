//
import * as Joi from 'joi';

export const bodySchema: Joi.Schema = Joi.object({
  username: Joi.string().min(8).required().messages({
   'string.min': '"username" length must be at least 8 characters long',
  }),
  role: Joi.string().valid('admin', 'user').required().messages({
    'string.base': '"role" must be a string',
    'any.only': '"role" must be "admin" or "user"',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
});

export const paramsSchema: Joi.Schema = Joi.object({
  id: Joi.number().positive().required().messages({
    'number.base': '"id" must be a number',
    'number.positive': '"id" must be a positive number',
  }),
});

export const bodyEditSchema: Joi.Schema = Joi.object({
  username: Joi.string().min(8).required().messages({
    'string.min': '"username" length must be at least 8 characters long',
  }),
  role: Joi.string().valid('admin', 'user').required().messages({
    'string.base': '"role" must be a string',
    'any.only': '"role" must be "admin" or "user"',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
});