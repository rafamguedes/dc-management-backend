"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const bcrypt = require("bcrypt");
const UserModel_1 = require("../models/UserModel");
const JwtService_1 = require("../utils/JwtService");
// Constants for the service response
const SUCCESSFUL = 'SUCCESSFUL';
const UNAUTHORIZED = 'UNAUTHORIZED';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const ERROR_CREATE_TOKEN = 'Error creating token';
const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password';
class LoginService {
    constructor(userModel = new UserModel_1.UserModel()) {
        this.userModel = userModel;
    }
    async authenticateUser({ email, password }) {
        const user = await this.userModel.getByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return { status: UNAUTHORIZED, data: { message: INVALID_CREDENTIALS_MESSAGE } };
        }
        const token = JwtService_1.JwtService.createToken({ id: user.id, email: user.email });
        if (!token) {
            return { status: INTERNAL_ERROR, data: { message: ERROR_CREATE_TOKEN } };
        }
        return { status: SUCCESSFUL, data: { token } };
    }
    async fetchUserRole(email) {
        const user = await this.userModel.getByEmail(email);
        if (!user) {
            return { status: UNAUTHORIZED, data: { message: INVALID_CREDENTIALS_MESSAGE } };
        }
        return { status: SUCCESSFUL, data: { role: user.role } };
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=LoginService.js.map