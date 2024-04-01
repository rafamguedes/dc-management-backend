"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const StatusCode_1 = require("../utils/StatusCode");
const UserService_1 = require("../services/UserService");
class UserController {
    constructor(userService = new UserService_1.UserService()) {
        this.userService = userService;
    }
    async getAllUsers(_req, res) {
        // 
        const { status, data } = await this.userService.getAllUsers();
        return res.status((0, StatusCode_1.StatusCode)(status)).json(data);
    }
    async registerUser(req, res) {
        // 
        const { body } = req;
        const { status, data } = await this.userService.registerUser(body);
        return res.status((0, StatusCode_1.StatusCode)(status)).json(data);
    }
    async updateUser(req, res) {
        //
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.userService.updateUser(+id, body);
        return res.status((0, StatusCode_1.StatusCode)(status)).json(data);
    }
    async deleteUser(req, res) {
        //
        const { id } = req.params;
        const { status, data } = await this.userService.deleteUser(+id);
        return res.status((0, StatusCode_1.StatusCode)(status)).json(data);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map