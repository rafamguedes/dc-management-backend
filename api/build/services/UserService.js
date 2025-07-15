"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcript = require("bcrypt");
const UserModel_1 = require("../models/UserModel");
// Constants for Service
const SALT_ROUNDS = 10;
const CONFLICT = 'CONFLICT';
const NOT_FOUND = 'NOT_FOUND';
const SUCCESSFUL = 'SUCCESSFUL';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const FAILED_REGISTER = 'Failed to register user';
const FAILED_USER_EXISTS = 'User already exists';
const FAILED_USER_NOT_FOUND = 'User not found';
const FAILED_GET_USERS = 'Failed to get users';
const FAILED_UPDATE = 'Failed to update user';
class UserService {
    constructor(userModel = new UserModel_1.UserModel()) {
        this.userModel = userModel;
    }
    async getAllUsers() {
        const users = await this.userModel.getAll();
        if (!users) {
            return { status: INTERNAL_ERROR, data: { message: FAILED_GET_USERS } };
        }
        return { status: SUCCESSFUL, data: users };
    }
    async registerUser(user) {
        const existingUser = await this.userModel.getByEmail(user.email);
        if (existingUser) {
            return { status: CONFLICT, data: { message: FAILED_USER_EXISTS } };
        }
        const passwordHash = await this.hashPassword(user.password);
        const newUser = await this.userModel.create({ ...user, password: passwordHash });
        if (!newUser) {
            return { status: INTERNAL_ERROR, data: { message: FAILED_REGISTER } };
        }
        return { status: SUCCESSFUL, data: newUser };
    }
    async updateUser(id, user) {
        const userExists = await this.userModel.getById(id);
        if (!userExists) {
            return { status: NOT_FOUND, data: { message: FAILED_USER_NOT_FOUND } };
        }
        const updatedUser = await this.userModel.update(id, user);
        if (!updatedUser) {
            return { status: INTERNAL_ERROR, data: { message: FAILED_UPDATE } };
        }
        return { status: SUCCESSFUL, data: updatedUser };
    }
    async deleteUser(id) {
        const userExists = await this.userModel.getById(id);
        if (!userExists) {
            return { status: NOT_FOUND, data: { message: FAILED_USER_NOT_FOUND } };
        }
        const deleted = await this.userModel.delete(id);
        if (!deleted) {
            return { status: INTERNAL_ERROR, data: deleted };
        }
        return { status: SUCCESSFUL, data: deleted };
    }
    async hashPassword(password) {
        return bcript.hash(password, SALT_ROUNDS);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map