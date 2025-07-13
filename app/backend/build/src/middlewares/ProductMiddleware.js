"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidator = void 0;
const ProductSchemas_1 = require("./schemas/ProductSchemas");
const INVALID_VALUE = 'INVALID_VALUE';
const validateBody = (req, res, next) => {
    const { code, name, description, unit } = req.body;
    const { error } = ProductSchemas_1.bodySchema.validate({ code, name, description, unit });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateParams = (req, res, next) => {
    const { error } = ProductSchemas_1.paramsSchema.validate({ id: req.params.id });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateCodeParams = (req, res, next) => {
    const { error } = ProductSchemas_1.codeParamsSchema.validate({ code: req.params.code });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateUnitParams = (req, res, next) => {
    const { error } = ProductSchemas_1.unitParamsSchema.validate({ unit: req.params.unit });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateUpdateBody = (req, res, next) => {
    const { code, name, description, unit } = req.body;
    const { error } = ProductSchemas_1.bodyEditSchema.validate({ code, name, description, unit });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
exports.ProductValidator = {
    validateBody,
    validateParams,
    validateCodeParams,
    validateUnitParams,
    validateUpdateBody
};
//# sourceMappingURL=ProductMiddleware.js.map