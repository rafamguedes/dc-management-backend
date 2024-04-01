"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("../controllers/LoginController");
const LoginMiddleware_1 = require("../middlewares/LoginMiddleware");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.loginController = new LoginController_1.LoginController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', LoginMiddleware_1.LoginValidator.validateBody, (req, res) => this.loginController.authenticateUser(req, res));
        this.router.get('/role', AuthMiddleware_1.Authenticate.authToken, (req, res) => this.loginController.fetchUserRole(req, res));
    }
}
exports.default = new LoginRoutes().router;
//# sourceMappingURL=LoginRoutes.js.map