"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorController = void 0;
const StatusCode_1 = require("../utils/StatusCode");
const SectorService_1 = require("../services/SectorService");
class SectorController {
    constructor(sectorService = new SectorService_1.SectorService()) {
        this.sectorService = sectorService;
    }
    async findAll(_req, res) {
        const { status, data } = await this.sectorService.findAll();
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.sectorService.findById(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async create(req, res) {
        const { body } = req;
        const { status, data } = await this.sectorService.create(body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.sectorService.update(+id, body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.sectorService.remove(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.SectorController = SectorController;
//# sourceMappingURL=SectorController.js.map