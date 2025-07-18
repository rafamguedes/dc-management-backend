"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SlotController_1 = require("../controllers/SlotController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const SlotMiddleware_1 = require("../middlewares/SlotMiddleware");
const createSlotRoutes = () => {
    const router = (0, express_1.Router)();
    const slotController = new SlotController_1.SlotController();
    router.post('/', AuthMiddleware_1.Authenticate.authToken, SlotMiddleware_1.SlotValidator.validateBody, (req, res) => slotController.create(req, res));
    router.get('/', AuthMiddleware_1.Authenticate.authToken, (req, res) => slotController.findAll(req, res));
    router.get('/:id', AuthMiddleware_1.Authenticate.authToken, SlotMiddleware_1.SlotValidator.validateParams, (req, res) => slotController.findById(req, res));
    router.get('/aisle/:aisleId', AuthMiddleware_1.Authenticate.authToken, SlotMiddleware_1.SlotValidator.validateAisleParams, (req, res) => slotController.findByAisle(req, res));
    router.get('/status/:status', AuthMiddleware_1.Authenticate.authToken, SlotMiddleware_1.SlotValidator.validateStatusParams, (req, res) => slotController.findByStatus(req, res));
    router.get('/floor/:floor', AuthMiddleware_1.Authenticate.authToken, SlotMiddleware_1.SlotValidator.validateFloorParams, (req, res) => slotController.findByFloor(req, res));
    router.put('/:id', AuthMiddleware_1.Authenticate.authToken, SlotMiddleware_1.SlotValidator.validateParams, SlotMiddleware_1.SlotValidator.validateUpdateBody, (req, res) => slotController.update(req, res));
    router.put('/:id/status', AuthMiddleware_1.Authenticate.authToken, SlotMiddleware_1.SlotValidator.validateParams, SlotMiddleware_1.SlotValidator.validateStatusUpdate, (req, res) => slotController.updateStatus(req, res));
    router.delete('/:id', AuthMiddleware_1.Authenticate.authToken, SlotMiddleware_1.SlotValidator.validateParams, (req, res) => slotController.remove(req, res));
    return router;
};
exports.default = createSlotRoutes();
//# sourceMappingURL=SlotRoutes.js.map