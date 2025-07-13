"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt = require("bcrypt");
const SequelizeUser_1 = require("../database/models/SequelizeUser");
class UserService {
    constructor() {
        this.USER_NOT_FOUND = 'User not found, please register first';
        this.USER_ALREADY_EXISTS = 'User already exists, please try a different email';
        this.ERROR_CREATING_USER = 'Failed to register user, please try again';
        this.ERROR_FETCHING_USERS = 'Failed to get users, please try again';
    }
    async findAll() {
        const users = await SequelizeUser_1.default.findAll({
            attributes: { exclude: ['password'] }
        });
        if (!users) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_USERS } };
        }
        return { status: 'SUCCESSFUL', data: users };
    }
    async findById(id) {
        const user = await SequelizeUser_1.default.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return { status: 'NOT_FOUND', data: { message: this.USER_NOT_FOUND } };
        }
        return { status: 'SUCCESSFUL', data: user };
    }
    async create(user) {
        const existingUser = await SequelizeUser_1.default.findOne({ where: { email: user.email } });
        if (existingUser) {
            return { status: 'CONFLICT', data: { message: this.USER_ALREADY_EXISTS } };
        }
        const passwordHash = await bcrypt.hash(user.password, 10);
        const newUser = await SequelizeUser_1.default.create({ ...user, password: passwordHash });
        if (!newUser) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_USER } };
        }
        const { password, ...userWithoutPassword } = newUser.get();
        return { status: 'SUCCESSFUL', data: userWithoutPassword };
    }
    async update(id, user) {
        const [affectedRows] = await SequelizeUser_1.default.update(user, { where: { id } });
        if (affectedRows === 0) {
            return { status: 'NOT_FOUND', data: { message: this.USER_NOT_FOUND } };
        }
        const updatedUser = await SequelizeUser_1.default.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        return { status: 'SUCCESSFUL', data: updatedUser };
    }
    async remove(id) {
        const deletedRows = await SequelizeUser_1.default.destroy({ where: { id } });
        if (deletedRows === 0) {
            return { status: 'NOT_FOUND', data: { message: this.USER_NOT_FOUND } };
        }
        return { status: 'SUCCESSFUL', data: true };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map