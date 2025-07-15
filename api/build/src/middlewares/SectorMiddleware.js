"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorValidator = void 0;
const SectorSchemas_1 = require("./schemas/SectorSchemas");
const INVALID_VALUE = 'INVALID_VALUE';
const validateBody = (req, res, next) => {
    const { name, description } = req.body;
    const { error } = SectorSchemas_1.bodySchema.validate({ name, description });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateParams = (req, res, next) => {
    const { error } = SectorSchemas_1.paramsSchema.validate({ id: req.params.id });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateUpdateBody = (req, res, next) => {
    const { name, description } = req.body;
    const { error } = SectorSchemas_1.bodyEditSchema.validate({ name, description });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
exports.SectorValidator = {
    validateBody,
    validateParams,
    validateUpdateBody
};
//# sourceMappingURL=SectorMiddleware.js.map