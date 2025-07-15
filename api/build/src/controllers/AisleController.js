"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AisleController = void 0;
const StatusCode_1 = require("../utils/StatusCode");
const AisleService_1 = require("../services/AisleService");
class AisleController {
    constructor(aisleService = new AisleService_1.AisleService()) {
        this.aisleService = aisleService;
    }
    async findAll(_req, res) {
        const { status, data } = await this.aisleService.findAll();
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.aisleService.findById(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findBySector(req, res) {
        const { sectorId } = req.params;
        const { status, data } = await this.aisleService.findBySector(+sectorId);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async create(req, res) {
        const { body } = req;
        const { status, data } = await this.aisleService.create(body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.aisleService.update(+id, body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.aisleService.remove(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.AisleController = AisleController;
//# sourceMappingURL=AisleController.js.map