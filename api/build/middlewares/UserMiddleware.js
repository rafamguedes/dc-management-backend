"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const UserSchemas_1 = require("./schemas/UserSchemas");
// Constant
const INVALID_VALUE = 'INVALID_VALUE';
class UserValidator {
    static validateBody(req, res, next) {
        const { username, role, email, password, image } = req.body;
        const { error } = UserSchemas_1.bodySchema.validate({ username, role, email, password, image });
        if (error) {
            return res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        }
        next();
    }
    static validateParams(req, res, next) {
        const { error } = UserSchemas_1.paramsSchema.validate({ id: req.params.id });
        if (error) {
            return res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        }
        next();
    }
    static validateUpdateBody(req, res, next) {
        const { username, role, email, image } = req.body;
        const { error } = UserSchemas_1.bodyEditSchema.validate({ username, role, email, image });
        if (error) {
            return res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
        }
        next();
    }
}
exports.UserValidator = UserValidator;
//# sourceMappingURL=UserMiddleware.js.map