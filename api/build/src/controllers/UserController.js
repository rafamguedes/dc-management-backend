"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const StatusCode_1 = require("../utils/StatusCode");
const UserService_1 = require("../services/UserService");
class UserController {
    constructor(userService = new UserService_1.UserService()) {
        this.userService = userService;
    }
    async findAll(_req, res) {
        const { status, data } = await this.userService.findAll();
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.userService.findById(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async create(req, res) {
        const { body } = req;
        const { status, data } = await this.userService.create(body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.userService.update(+id, body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.userService.remove(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map