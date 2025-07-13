"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserMiddleware_1 = require("../middlewares/UserMiddleware");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const createUserRoutes = () => {
    const router = (0, express_1.Router)();
    const userController = new UserController_1.UserController();
    router.post('/', UserMiddleware_1.UserValidator.validateBody, (req, res) => userController.create(req, res));
    router.get('/', AuthMiddleware_1.Authenticate.authToken, (req, res) => userController.findAll(req, res));
    router.get('/:id', AuthMiddleware_1.Authenticate.authToken, (req, res) => userController.findById(req, res));
    router.put('/:id', AuthMiddleware_1.Authenticate.authToken, UserMiddleware_1.UserValidator.validateParams, UserMiddleware_1.UserValidator.validateUpdateBody, (req, res) => userController.update(req, res));
    router.delete('/:id', AuthMiddleware_1.Authenticate.authToken, UserMiddleware_1.UserValidator.validateParams, (req, res) => userController.remove(req, res));
    return router;
};
exports.default = createUserRoutes();
//# sourceMappingURL=UserRoutes.js.map