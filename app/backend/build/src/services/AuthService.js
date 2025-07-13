"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const JwtService_1 = require("./JwtService");
const SequelizeUser_1 = require("../database/models/SequelizeUser");
class AuthService {
    constructor() {
        this.USER_NOT_FOUND = 'User not found, please register first';
        this.INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password, please try again';
        this.ERROR_CREATING_TOKEN = 'Error creating token, please try again';
        this.INTERNAL_ERROR = 'Internal server error, please try again later';
    }
    async authenticateUser({ email, password }) {
        try {
            const user = await SequelizeUser_1.default.findOne({ where: { email } });
            if (!user) {
                return { status: 'NOT_FOUND', data: { message: this.USER_NOT_FOUND } };
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { status: 'UNAUTHORIZED', data: { message: this.INVALID_CREDENTIALS_MESSAGE } };
            }
            const token = JwtService_1.JwtService.createToken({ id: user.id, email: user.email });
            const responseData = {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    image: user.image
                }
            };
            if (!token) {
                return { status: 'UNPROCESSABLE_ENTITY', data: { message: this.ERROR_CREATING_TOKEN } };
            }
            return { status: 'SUCCESSFUL', data: responseData };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.INTERNAL_ERROR } };
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map