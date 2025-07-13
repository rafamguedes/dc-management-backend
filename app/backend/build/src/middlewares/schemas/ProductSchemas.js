"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyEditSchema = exports.unitParamsSchema = exports.codeParamsSchema = exports.paramsSchema = exports.bodySchema = void 0;
const Joi = require("joi");
// Schema for creating a new product
exports.bodySchema = Joi.object({
    code: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required()
        .messages({
        'string.empty': 'Code is required',
        'string.min': 'Code must have at least 1 character',
        'string.max': 'Code must have at most 50 characters',
        'any.required': 'Code is required',
    }),
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must have at least 1 character',
        'string.max': 'Name must have at most 100 characters',
        'any.required': 'Name is required',
    }),
    description: Joi.string()
        .trim()
        .allow('')
        .optional()
        .messages({
        'string.base': 'Description must be a string',
    }),
    unit: Joi.string()
        .trim()
        .min(1)
        .max(20)
        .required()
        .messages({
        'string.empty': 'Unit is required',
        'string.min': 'Unit must have at least 1 character',
        'string.max': 'Unit must have at most 20 characters',
        'any.required': 'Unit is required',
    }),
});
// Schema for validating ID parameters
exports.paramsSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number',
        'any.required': 'ID is required',
    }),
});
// Schema for validating code parameters
exports.codeParamsSchema = Joi.object({
    code: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required()
        .messages({
        'string.empty': 'Code is required',
        'string.min': 'Code must have at least 1 character',
        'string.max': 'Code must have at most 50 characters',
        'any.required': 'Code is required',
    }),
});
// Schema for validating unit parameters
exports.unitParamsSchema = Joi.object({
    unit: Joi.string()
        .trim()
        .min(1)
        .max(20)
        .required()
        .messages({
        'string.empty': 'Unit is required',
        'string.min': 'Unit must have at least 1 character',
        'string.max': 'Unit must have at most 20 characters',
        'any.required': 'Unit is required',
    }),
});
// Schema for updating a product (all fields optional)
exports.bodyEditSchema = Joi.object({
    code: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .optional()
        .messages({
        'string.empty': 'Code cannot be empty if provided',
        'string.min': 'Code must have at least 1 character',
        'string.max': 'Code must have at most 50 characters',
    }),
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .optional()
        .messages({
        'string.empty': 'Name cannot be empty if provided',
        'string.min': 'Name must have at least 1 character',
        'string.max': 'Name must have at most 100 characters',
    }),
    description: Joi.string()
        .trim()
        .allow('')
        .optional()
        .messages({
        'string.base': 'Description must be a string',
    }),
    unit: Joi.string()
        .trim()
        .min(1)
        .max(20)
        .optional()
        .messages({
        'string.empty': 'Unit cannot be empty if provided',
        'string.min': 'Unit must have at least 1 character',
        'string.max': 'Unit must have at most 20 characters',
    }),
}).min(1).messages({
    'object.min': 'At least one field must be provided for update',
});
//# sourceMappingURL=ProductSchemas.js.map