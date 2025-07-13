"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = void 0;
const LoginSchemas_1 = require("./schemas/LoginSchemas");
const validateBody = (req, res, next) => {
    const { email, password } = req.body;
    const { error } = LoginSchemas_1.LoginSchemas.validate({ email, password });
    if (error) {
        res.status(400).json({ status: 'INVALID_VALUE', message: error.details[0].message });
        return;
    }
    next();
};
exports.LoginValidator = {
    validateBody
};
//# sourceMappingURL=LoginMiddleware.js.map