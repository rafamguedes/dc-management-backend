"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalletController = void 0;
const StatusCode_1 = require("../utils/StatusCode");
const PalletService_1 = require("../services/PalletService");
class PalletController {
    constructor(palletService = new PalletService_1.PalletService()) {
        this.palletService = palletService;
    }
    async findAll(_req, res) {
        const { status, data } = await this.palletService.findAll();
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.palletService.findById(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findBySlot(req, res) {
        const { slotId } = req.params;
        const { status, data } = await this.palletService.findBySlot(+slotId);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findByType(req, res) {
        const { type } = req.params;
        const { status, data } = await this.palletService.findByType(type);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findByQrCode(req, res) {
        const { qrCode } = req.params;
        const { status, data } = await this.palletService.findByQrCode(qrCode);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findByQrCodeSmall(req, res) {
        const { qrCodeSmall } = req.params;
        const { status, data } = await this.palletService.findByQrCodeSmall(qrCodeSmall);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findUnassigned(_req, res) {
        const { status, data } = await this.palletService.findUnassigned();
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async create(req, res) {
        const { type, slotId, userId, productId } = req.body;
        const { status, data } = await this.palletService.create({
            type,
            slotId,
            userId,
            productId,
        });
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async update(req, res) {
        const { id } = req.params;
        const { type, slotId, qrCode, qrCodeSmall } = req.body;
        const { status, data } = await this.palletService.update(+id, {
            type,
            slotId,
            qrCode,
            qrCodeSmall,
        });
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async assignToSlot(req, res) {
        const { id } = req.params;
        const { slotId } = req.body;
        const { status, data } = await this.palletService.assignToSlot(+id, slotId);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async unassignFromSlot(req, res) {
        const { id } = req.params;
        const { status, data } = await this.palletService.unassignFromSlot(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.palletService.remove(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.PalletController = PalletController;
//# sourceMappingURL=PalletController.js.map