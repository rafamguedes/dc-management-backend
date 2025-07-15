"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchemas = void 0;
const Joi = require("joi");
exports.LoginSchemas = Joi.object({
    //
    email: Joi.string().email().required().messages({
        'string.email': '"email" must be a valid email',
        'string.base': '"email" must be a string',
        'any.required': '"email" is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': '"password" length must be at least 6 characters long',
        'any.required': '"password" is required',
        'string.base': '"password" must be a string',
    }),
});
//# sourceMappingURL=LoginSchemas.js.map