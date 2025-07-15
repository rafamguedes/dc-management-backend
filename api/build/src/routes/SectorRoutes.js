"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const SectorMiddleware_1 = require("../middlewares/SectorMiddleware");
const SectorController_1 = require("../controllers/SectorController");
const createSectorRoutes = () => {
    const router = (0, express_1.Router)();
    const sectorController = new SectorController_1.SectorController();
    router.post('/', AuthMiddleware_1.Authenticate.authToken, SectorMiddleware_1.SectorValidator.validateBody, (req, res) => sectorController.create(req, res));
    router.get('/', AuthMiddleware_1.Authenticate.authToken, (req, res) => sectorController.findAll(req, res));
    router.get('/:id', AuthMiddleware_1.Authenticate.authToken, SectorMiddleware_1.SectorValidator.validateParams, (req, res) => sectorController.findById(req, res));
    router.put('/:id', AuthMiddleware_1.Authenticate.authToken, SectorMiddleware_1.SectorValidator.validateParams, SectorMiddleware_1.SectorValidator.validateUpdateBody, (req, res) => sectorController.update(req, res));
    router.delete('/:id', AuthMiddleware_1.Authenticate.authToken, SectorMiddleware_1.SectorValidator.validateParams, (req, res) => sectorController.remove(req, res));
    return router;
};
exports.default = createSectorRoutes();
//# sourceMappingURL=SectorRoutes.js.map