"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidator = void 0;
const SlotSchemas_1 = require("./schemas/SlotSchemas");
const INVALID_VALUE = 'INVALID_VALUE';
const validateBody = (req, res, next) => {
    const { aisleId, code, floor, status } = req.body;
    const { error } = SlotSchemas_1.bodySchema.validate({ aisleId, code, floor, status });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateParams = (req, res, next) => {
    const { error } = SlotSchemas_1.paramsSchema.validate({ id: req.params.id });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateAisleParams = (req, res, next) => {
    const { error } = SlotSchemas_1.aisleParamsSchema.validate({ aisleId: req.params.aisleId });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateStatusParams = (req, res, next) => {
    const { error } = SlotSchemas_1.statusParamsSchema.validate({ status: req.params.status });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateFloorParams = (req, res, next) => {
    const { error } = SlotSchemas_1.floorParamsSchema.validate({ floor: req.params.floor });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateUpdateBody = (req, res, next) => {
    const { aisleId, code, floor, status } = req.body;
    const { error } = SlotSchemas_1.bodyEditSchema.validate({ aisleId, code, floor, status });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateStatusUpdate = (req, res, next) => {
    const { status } = req.body;
    const { error } = SlotSchemas_1.statusUpdateSchema.validate({ status });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
exports.SlotValidator = {
    validateBody,
    validateParams,
    validateAisleParams,
    validateStatusParams,
    validateFloorParams,
    validateUpdateBody,
    validateStatusUpdate
};
//# sourceMappingURL=SlotMiddleware.js.map