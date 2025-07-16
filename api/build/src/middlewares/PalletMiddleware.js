"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalletValidator = void 0;
const PalletSchemas_1 = require("./schemas/PalletSchemas");
const INVALID_VALUE = 'INVALID_VALUE';
const validateBody = (req, res, next) => {
    const { type, slotId, userId, productId } = req.body;
    const { error } = PalletSchemas_1.bodySchema.validate({ type, slotId, userId, productId });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateParams = (req, res, next) => {
    const { error } = PalletSchemas_1.paramsSchema.validate({ id: req.params.id });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateSlotParams = (req, res, next) => {
    const { error } = PalletSchemas_1.slotParamsSchema.validate({ slotId: req.params.slotId });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateTypeParams = (req, res, next) => {
    const { error } = PalletSchemas_1.typeParamsSchema.validate({ type: req.params.type });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateQrCodeParams = (req, res, next) => {
    const { error } = PalletSchemas_1.qrCodeParamsSchema.validate({ qrCode: req.params.qrCode });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateQrCodeSmallParams = (req, res, next) => {
    const { error } = PalletSchemas_1.qrCodeSmallParamsSchema.validate({ qrCodeSmall: req.params.qrCodeSmall });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateUpdateBody = (req, res, next) => {
    const { type, slotId, qrCode, qrCodeSmall } = req.body;
    const { error } = PalletSchemas_1.bodyEditSchema.validate({ type, slotId, qrCode, qrCodeSmall });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
const validateAssignSlot = (req, res, next) => {
    const { slotId } = req.body;
    const { error } = PalletSchemas_1.assignSlotSchema.validate({ slotId });
    if (error) {
        res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        return;
    }
    next();
};
exports.PalletValidator = {
    validateBody,
    validateParams,
    validateSlotParams,
    validateTypeParams,
    validateQrCodeParams,
    validateQrCodeSmallParams,
    validateUpdateBody,
    validateAssignSlot
};
//# sourceMappingURL=PalletMiddleware.js.map