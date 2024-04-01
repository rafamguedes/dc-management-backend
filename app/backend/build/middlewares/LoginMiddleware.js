"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = void 0;
const LoginSchemas_1 = require("./schemas/LoginSchemas");
class LoginValidator {
    static validateBody(req, res, next) {
        //
        const { email, password } = req.body;
        const { error } = LoginSchemas_1.LoginSchemas.validate({ email, password });
        if (error) {
            return res.status(400).json({ status: 'INVALID_VALUE', message: error.details[0].message });
        }
        next();
    }
}
exports.LoginValidator = LoginValidator;
//# sourceMappingURL=LoginMiddleware.js.map