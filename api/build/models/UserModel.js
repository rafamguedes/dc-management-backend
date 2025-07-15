"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const SequelizeUser_1 = require("../database/models/SequelizeUser");
class UserModel {
    constructor(userModel = SequelizeUser_1.default) {
        this.userModel = userModel;
    }
    async getAll() {
        const users = await this.userModel.findAll({ attributes: { exclude: ['password'] } });
        if (!users)
            return null;
        const userList = users.map((user) => user.get());
        return userList;
    }
    async getByEmail(email) {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user)
            return null;
        return user.get();
    }
    async getById(id) {
        const user = await this.userModel.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user)
            return null;
        return user.get();
    }
    async create(user) {
        const newUser = await this.userModel.create(user);
        if (!newUser)
            return null;
        const { password, ...userWithoutPassword } = newUser.get();
        return userWithoutPassword;
    }
    async update(id, user) {
        const userUpdate = await this.userModel.update({ ...user }, { where: { id } });
        if (!userUpdate)
            return null;
        const updatedUser = await this.getById(id);
        return updatedUser;
    }
    async delete(id) {
        const destroyUser = await this.userModel.destroy({ where: { id } });
        if (!destroyUser)
            return false;
        return true;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map