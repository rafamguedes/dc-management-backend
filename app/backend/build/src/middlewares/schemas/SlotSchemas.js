"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusUpdateSchema = exports.bodyEditSchema = exports.floorParamsSchema = exports.statusParamsSchema = exports.aisleParamsSchema = exports.paramsSchema = exports.bodySchema = void 0;
const Joi = require("joi");
const bodySchema = Joi.object({
    aisleId: Joi.number().integer().positive().required().messages({
        'number.base': 'Aisle ID must be a number',
        'number.integer': 'Aisle ID must be an integer',
        'number.positive': 'Aisle ID must be a positive number',
        'any.required': 'Aisle ID is required',
    }),
    code: Joi.string().min(1).max(10).required().messages({
        'string.base': 'Code must be a string',
        'string.empty': 'Code cannot be empty',
        'string.min': 'Code must have at least 1 character',
        'string.max': 'Code must have at most 10 characters',
        'any.required': 'Code is required',
    }),
    floor: Joi.number().integer().min(1).required().messages({
        'number.base': 'Floor must be a number',
        'number.integer': 'Floor must be an integer',
        'number.min': 'Floor must be at least 1',
        'any.required': 'Floor is required',
    }),
    status: Joi.string().valid('available', 'occupied', 'maintenance').optional().messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be one of: available, occupied, maintenance',
    }),
});
exports.bodySchema = bodySchema;
const paramsSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number',
        'any.required': 'ID is required',
    }),
});
exports.paramsSchema = paramsSchema;
const aisleParamsSchema = Joi.object({
    aisleId: Joi.number().integer().positive().required().messages({
        'number.base': 'Aisle ID must be a number',
        'number.integer': 'Aisle ID must be an integer',
        'number.positive': 'Aisle ID must be a positive number',
        'any.required': 'Aisle ID is required',
    }),
});
exports.aisleParamsSchema = aisleParamsSchema;
const statusParamsSchema = Joi.object({
    status: Joi.string().valid('available', 'occupied', 'maintenance').required().messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be one of: available, occupied, maintenance',
        'any.required': 'Status is required',
    }),
});
exports.statusParamsSchema = statusParamsSchema;
const floorParamsSchema = Joi.object({
    floor: Joi.number().integer().min(1).required().messages({
        'number.base': 'Floor must be a number',
        'number.integer': 'Floor must be an integer',
        'number.min': 'Floor must be at least 1',
        'any.required': 'Floor is required',
    }),
});
exports.floorParamsSchema = floorParamsSchema;
const bodyEditSchema = Joi.object({
    aisleId: Joi.number().integer().positive().optional().messages({
        'number.base': 'Aisle ID must be a number',
        'number.integer': 'Aisle ID must be an integer',
        'number.positive': 'Aisle ID must be a positive number',
    }),
    code: Joi.string().min(1).max(10).optional().messages({
        'string.base': 'Code must be a string',
        'string.empty': 'Code cannot be empty',
        'string.min': 'Code must have at least 1 character',
        'string.max': 'Code must have at most 10 characters',
    }),
    floor: Joi.number().integer().min(1).optional().messages({
        'number.base': 'Floor must be a number',
        'number.integer': 'Floor must be an integer',
        'number.min': 'Floor must be at least 1',
    }),
    status: Joi.string().valid('available', 'occupied', 'maintenance').optional().messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be one of: available, occupied, maintenance',
    }),
});
exports.bodyEditSchema = bodyEditSchema;
const statusUpdateSchema = Joi.object({
    status: Joi.string().valid('available', 'occupied', 'maintenance').required().messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be one of: available, occupied, maintenance',
        'any.required': 'Status is required',
    }),
});
exports.statusUpdateSchema = statusUpdateSchema;
//# sourceMappingURL=SlotSchemas.js.map