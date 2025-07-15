"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const LoginMiddleware_1 = require("../middlewares/LoginMiddleware");
const createAuthRoutes = () => {
    const router = (0, express_1.Router)();
    const authController = new AuthController_1.AuthController();
    router.post('/', LoginMiddleware_1.LoginValidator.validateBody, (req, res) => authController.authenticateUser(req, res));
    return router;
};
exports.default = createAuthRoutes();
//# sourceMappingURL=AuthRoutes.js.map