"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PalletController_1 = require("../controllers/PalletController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const PalletMiddleware_1 = require("../middlewares/PalletMiddleware");
const router = (0, express_1.Router)();
// Public endpoint to check unassigned pallets
router.get('/unassigned', async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.findUnassigned(req, res);
});
// Public endpoint to find pallet by main QR code
router.get('/qr/:qrCode', PalletMiddleware_1.PalletValidator.validateQrCodeParams, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.findByQrCode(req, res);
});
// Public endpoint to find pallet by small QR code
router.get('/qrsmall/:qrCodeSmall', PalletMiddleware_1.PalletValidator.validateQrCodeSmallParams, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.findByQrCodeSmall(req, res);
});
// Protected routes - require authentication
router.use(AuthMiddleware_1.Authenticate.authToken);
// Get all pallets
router.get('/', async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.findAll(req, res);
});
// Get pallet by ID
router.get('/:id', PalletMiddleware_1.PalletValidator.validateParams, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.findById(req, res);
});
// Get pallets by type
router.get('/type/:type', PalletMiddleware_1.PalletValidator.validateTypeParams, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.findByType(req, res);
});
// Get pallets by slot ID
router.get('/slot/:slotId', PalletMiddleware_1.PalletValidator.validateSlotParams, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.findBySlot(req, res);
});
// Create new pallet
router.post('/', PalletMiddleware_1.PalletValidator.validateBody, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.create(req, res);
});
// Update pallet
router.put('/:id', PalletMiddleware_1.PalletValidator.validateParams, PalletMiddleware_1.PalletValidator.validateUpdateBody, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.update(req, res);
});
// Delete pallet
router.delete('/:id', PalletMiddleware_1.PalletValidator.validateParams, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.remove(req, res);
});
// Assign pallet to slot
router.patch('/:id/assign', PalletMiddleware_1.PalletValidator.validateParams, PalletMiddleware_1.PalletValidator.validateAssignSlot, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.assignToSlot(req, res);
});
// Unassign pallet from slot
router.patch('/:id/unassign', PalletMiddleware_1.PalletValidator.validateParams, async (req, res) => {
    const palletController = new PalletController_1.PalletController();
    await palletController.unassignFromSlot(req, res);
});
exports.default = router;
//# sourceMappingURL=PalletRoutes.js.map