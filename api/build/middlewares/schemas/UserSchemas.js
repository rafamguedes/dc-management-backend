"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyEditSchema = exports.paramsSchema = exports.bodySchema = void 0;
//
const Joi = require("joi");
exports.bodySchema = Joi.object({
    username: Joi.string().min(8).required().messages({
        'string.min': '"username" length must be at least 8 characters long',
        'string.base': '"username" must be a string',
        'string.empty': '"username" is not allowed to be empty',
    }),
    role: Joi.string().valid('admin', 'user').required().messages({
        'string.base': '"role" must be a string',
        'any.only': '"role" must be "admin" or "user"',
        'string.empty': '"role" is not allowed to be empty',
    }),
    email: Joi.string().email().required().messages({
        'string.email': '"email" must be a valid email',
        'string.base': '"email" must be a string',
        'string.empty': '"email" is not allowed to be empty',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': '"password" length must be at least 6 characters long',
        'string.base': '"password" must be a string',
        'string.empty': '"password" is not allowed to be empty',
    }),
    image: Joi.string().uri().messages({
        'string.uri': '"image" must be a valid URL',
        'string.base': '"image" must be a string',
    }),
});
exports.paramsSchema = Joi.object({
    id: Joi.number().positive().required().messages({
        'number.base': '"id" must be a number',
        'number.positive': '"id" must be a positive number',
        'any.required': '"id" is required',
    }),
});
exports.bodyEditSchema = Joi.object({
    username: Joi.string().min(8).messages({
        'string.min': '"username" length must be at least 8 characters long',
        'string.base': '"username" must be a string',
        'string.empty': '"username" is not allowed to be empty',
    }),
    role: Joi.string().valid('admin', 'user').messages({
        'string.base': '"role" must be a string',
        'any.only': '"role" must be "admin" or "user"',
        'string.empty': '"role" is not allowed to be empty',
    }),
    email: Joi.string().email().messages({
        'string.email': '"email" must be a valid email',
        'string.base': '"email" must be a string',
        'string.empty': '"email" is not allowed to be empty',
    }),
    image: Joi.string().uri().messages({
        'string.uri': '"image" must be a valid URL',
        'string.base': '"image" must be a string',
    }),
});
//# sourceMappingURL=UserSchemas.js.map