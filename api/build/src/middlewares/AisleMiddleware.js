"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AisleValidator = void 0;
const AisleSchemas_1 = require("./schemas/AisleSchemas");
const INVALID_VALUE = 'INVALID_VALUE';
const validateBody = (req, res, next) => {
    const { sectorId, code, description } = req.body;
    const { error } = AisleSchemas_1.bodySchema.validate({ sectorId, code, description });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateParams = (req, res, next) => {
    const { error } = AisleSchemas_1.paramsSchema.validate({ id: req.params.id });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateSectorParams = (req, res, next) => {
    const { error } = AisleSchemas_1.sectorParamsSchema.validate({ sectorId: req.params.sectorId });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateUpdateBody = (req, res, next) => {
    const { sectorId, code, description } = req.body;
    const { error } = AisleSchemas_1.bodyEditSchema.validate({ sectorId, code, description });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
exports.AisleValidator = {
    validateBody,
    validateParams,
    validateSectorParams,
    validateUpdateBody
};
//# sourceMappingURL=AisleMiddleware.js.map