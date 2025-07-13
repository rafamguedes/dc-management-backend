"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSlotSchema = exports.bodyEditSchema = exports.qrCodeSmallParamsSchema = exports.qrCodeParamsSchema = exports.typeParamsSchema = exports.slotParamsSchema = exports.paramsSchema = exports.bodySchema = void 0;
const Joi = require("joi");
// Schema for creating a new pallet
exports.bodySchema = Joi.object({
    type: Joi.string()
        .valid('master', 'single')
        .required()
        .messages({
        'any.only': 'Type must be either "master" or "single"',
        'any.required': 'Type is required',
    }),
    slotId: Joi.number()
        .integer()
        .positive()
        .optional()
        .allow(null)
        .messages({
        'number.base': 'Slot ID must be a number',
        'number.integer': 'Slot ID must be an integer',
        'number.positive': 'Slot ID must be a positive number',
    }),
    qrCode: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
        'string.empty': 'QR Code is required',
        'string.min': 'QR Code must have at least 1 character',
        'string.max': 'QR Code must have at most 100 characters',
        'any.required': 'QR Code is required',
    }),
    qrCodeSmall: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
        'string.empty': 'Small QR Code is required',
        'string.min': 'Small QR Code must have at least 1 character',
        'string.max': 'Small QR Code must have at most 100 characters',
        'any.required': 'Small QR Code is required',
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
// Schema for validating slot ID parameters
exports.slotParamsSchema = Joi.object({
    slotId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
        'number.base': 'Slot ID must be a number',
        'number.integer': 'Slot ID must be an integer',
        'number.positive': 'Slot ID must be a positive number',
        'any.required': 'Slot ID is required',
    }),
});
// Schema for validating type parameters
exports.typeParamsSchema = Joi.object({
    type: Joi.string()
        .valid('master', 'single')
        .required()
        .messages({
        'any.only': 'Type must be either "master" or "single"',
        'any.required': 'Type is required',
    }),
});
// Schema for validating QR code parameters
exports.qrCodeParamsSchema = Joi.object({
    qrCode: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
        'string.empty': 'QR Code is required',
        'string.min': 'QR Code must have at least 1 character',
        'string.max': 'QR Code must have at most 100 characters',
        'any.required': 'QR Code is required',
    }),
});
// Schema for validating small QR code parameters
exports.qrCodeSmallParamsSchema = Joi.object({
    qrCodeSmall: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
        'string.empty': 'Small QR Code is required',
        'string.min': 'Small QR Code must have at least 1 character',
        'string.max': 'Small QR Code must have at most 100 characters',
        'any.required': 'Small QR Code is required',
    }),
});
// Schema for updating a pallet (all fields optional)
exports.bodyEditSchema = Joi.object({
    type: Joi.string()
        .valid('master', 'single')
        .optional()
        .messages({
        'any.only': 'Type must be either "master" or "single"',
    }),
    slotId: Joi.number()
        .integer()
        .positive()
        .optional()
        .allow(null)
        .messages({
        'number.base': 'Slot ID must be a number',
        'number.integer': 'Slot ID must be an integer',
        'number.positive': 'Slot ID must be a positive number',
    }),
    qrCode: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .optional()
        .messages({
        'string.empty': 'QR Code cannot be empty if provided',
        'string.min': 'QR Code must have at least 1 character',
        'string.max': 'QR Code must have at most 100 characters',
    }),
    qrCodeSmall: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .optional()
        .messages({
        'string.empty': 'Small QR Code cannot be empty if provided',
        'string.min': 'Small QR Code must have at least 1 character',
        'string.max': 'Small QR Code must have at most 100 characters',
    }),
}).min(1).messages({
    'object.min': 'At least one field must be provided for update',
});
// Schema for slot assignment
exports.assignSlotSchema = Joi.object({
    slotId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
        'number.base': 'Slot ID must be a number',
        'number.integer': 'Slot ID must be an integer',
        'number.positive': 'Slot ID must be a positive number',
        'any.required': 'Slot ID is required',
    }),
});
//# sourceMappingURL=PalletSchemas.js.map