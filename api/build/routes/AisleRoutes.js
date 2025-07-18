"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AisleController_1 = require("../controllers/AisleController");
const AisleMiddleware_1 = require("../middlewares/AisleMiddleware");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const createAisleRoutes = () => {
    const router = (0, express_1.Router)();
    const aisleController = new AisleController_1.AisleController();
    router.post('/', AuthMiddleware_1.Authenticate.authToken, AisleMiddleware_1.AisleValidator.validateBody, (req, res) => aisleController.create(req, res));
    router.get('/', AuthMiddleware_1.Authenticate.authToken, (req, res) => aisleController.findAll(req, res));
    router.get('/:id', AuthMiddleware_1.Authenticate.authToken, AisleMiddleware_1.AisleValidator.validateParams, (req, res) => aisleController.findById(req, res));
    router.get('/sector/:sectorId', AuthMiddleware_1.Authenticate.authToken, AisleMiddleware_1.AisleValidator.validateSectorParams, (req, res) => aisleController.findBySector(req, res));
    router.put('/:id', AuthMiddleware_1.Authenticate.authToken, AisleMiddleware_1.AisleValidator.validateParams, AisleMiddleware_1.AisleValidator.validateUpdateBody, (req, res) => aisleController.update(req, res));
    router.delete('/:id', AuthMiddleware_1.Authenticate.authToken, AisleMiddleware_1.AisleValidator.validateParams, (req, res) => aisleController.remove(req, res));
    return router;
};
exports.default = createAisleRoutes();
//# sourceMappingURL=AisleRoutes.js.map