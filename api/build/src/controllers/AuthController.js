"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const StatusCode_1 = require("../utils/StatusCode");
class AuthController {
    constructor(authService = new AuthService_1.AuthService()) {
        this.authService = authService;
    }
    async authenticateUser({ body }, res) {
        const { status, data } = await this.authService.authenticateUser(body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map