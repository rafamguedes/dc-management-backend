"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const LoginService_1 = require("../services/LoginService");
const StatusCode_1 = require("../utils/StatusCode");
class LoginController {
    constructor(loginService = new LoginService_1.LoginService()) {
        this.loginService = loginService;
    }
    async authenticateUser({ body }, res) {
        const { status, data } = await this.loginService.authenticateUser(body);
        return res.status((0, StatusCode_1.StatusCode)(status)).json(data);
    }
    async fetchUserRole(_req, res) {
        const email = res.locals.user.email;
        const { status, data } = await this.loginService.fetchUserRole(email);
        return res.status((0, StatusCode_1.StatusCode)(status)).json(data);
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map