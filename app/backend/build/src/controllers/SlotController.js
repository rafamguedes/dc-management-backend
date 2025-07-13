"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotController = void 0;
const StatusCode_1 = require("../utils/StatusCode");
const SlotService_1 = require("../services/SlotService");
class SlotController {
    constructor(slotService = new SlotService_1.SlotService()) {
        this.slotService = slotService;
    }
    async findAll(_req, res) {
        const { status, data } = await this.slotService.findAll();
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.slotService.findById(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findByAisle(req, res) {
        const { aisleId } = req.params;
        const { status, data } = await this.slotService.findByAisle(+aisleId);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findByStatus(req, res) {
        const { status: slotStatus } = req.params;
        const { status, data } = await this.slotService.findByStatus(slotStatus);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findByFloor(req, res) {
        const { floor } = req.params;
        const { status, data } = await this.slotService.findByFloor(+floor);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async create(req, res) {
        const { body } = req;
        const { status, data } = await this.slotService.create(body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.slotService.update(+id, body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async updateStatus(req, res) {
        const { id } = req.params;
        const { status: newStatus } = req.body;
        const { status, data } = await this.slotService.updateStatus(+id, newStatus);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.slotService.remove(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.SlotController = SlotController;
//# sourceMappingURL=SlotController.js.map