"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserMiddleware_1 = require("../middlewares/UserMiddleware");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new UserController_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', (req, res) => this.userController.getAllUsers(req, res));
        this.router.post('/', UserMiddleware_1.UserValidator.validateBody, (req, res) => this.userController.registerUser(req, res));
        this.router.put('/:id', UserMiddleware_1.UserValidator.validateParams, UserMiddleware_1.UserValidator.validateUpdateBody, (req, res) => this.userController.updateUser(req, res));
        this.router.delete('/:id', UserMiddleware_1.UserValidator.validateParams, (req, res) => this.userController.deleteUser(req, res));
    }
}
exports.default = new UserRoutes().router;
//# sourceMappingURL=UserRoutes.js.map