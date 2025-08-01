"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorController = void 0;
const StatusCodes_1 = require("../utils/StatusCodes");
const SectorService_1 = require("../services/SectorService");
class SectorController {
    constructor(sectorService = new SectorService_1.SectorService()) {
        this.sectorService = sectorService;
    }
    /**
     * @swagger
     * tags:
     *   name: Sectors
     *   description: Sector management operations
     */
    async findAll(_req, res) {
        const { status, data } = await this.sectorService.findAll();
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /sectors/{id}:
     *   get:
     *     summary: Get sector by ID
     *     tags: [Sectors]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Sector found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Sector'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Sector not found
     */
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.sectorService.findById(+id);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /sectors:
     *   post:
     *     summary: Create a new sector
     *     tags: [Sectors]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Sector'
     *     responses:
     *       201:
     *         description: Sector created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Sector'
     *       400:
     *         description: Bad request
     */
    async create(req, res) {
        const { body } = req;
        const { status, data } = await this.sectorService.create(body);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /sectors/{id}:
     *   put:
     *     summary: Update a sector
     *     tags: [Sectors]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Sector'
     *     responses:
     *       200:
     *         description: Sector updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Sector'
     *       400:
     *         description: Bad request
     */
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.sectorService.update(+id, body);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /sectors/{id}:
     *   delete:
     *     summary: Delete a sector
     *     tags: [Sectors]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Sector deleted successfully
     *       404:
     *         description: Sector not found
     */
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.sectorService.remove(+id);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
}
exports.SectorController = SectorController;
//# sourceMappingURL=SectorController.js.map