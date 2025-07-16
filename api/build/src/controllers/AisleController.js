"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AisleController = void 0;
const StatusCode_1 = require("../utils/StatusCode");
const AisleService_1 = require("../services/AisleService");
/**
 * @swagger
 * tags:
 *   name: Aisles
 *   description: Aisle management operations
 */
class AisleController {
    constructor(aisleService = new AisleService_1.AisleService()) {
        this.aisleService = aisleService;
    }
    /**
     * @swagger
     * /aisles:
     *   get:
     *     summary: Get all aisles
     *     tags: [Aisles]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of all aisles
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Aisle'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: No aisles found
     *       500:
     *         description: Internal server error
     */
    async findAll(_req, res) {
        const { status, data } = await this.aisleService.findAll();
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /aisles/{id}:
     *   get:
     *     summary: Get aisle by ID
     *     tags: [Aisles]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Aisle ID
     *     responses:
     *       200:
     *         description: Aisle details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Aisle'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Aisle not found
     *       500:
     *         description: Internal server error
     */
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.aisleService.findById(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /aisles/sector/{sectorId}:
     *   get:
     *     summary: Get aisles by sector ID
     *     tags: [Aisles]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: sectorId
     *         required: true
     *         schema:
     *           type: integer
     *         description: Sector ID
     *     responses:
     *       200:
     *         description: List of aisles in the sector
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Aisle'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: No aisles found in sector
     *       500:
     *         description: Internal server error
     */
    async findBySector(req, res) {
        const { sectorId } = req.params;
        const { status, data } = await this.aisleService.findBySector(+sectorId);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /aisles:
     *   post:
     *     summary: Create a new aisle
     *     tags: [Aisles]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - code
     *               - sectorId
     *             properties:
     *               name:
     *                 type: string
     *                 description: Aisle name
     *                 example: "Aisle A1"
     *               code:
     *                 type: string
     *                 description: Unique aisle code
     *                 example: "A1"
     *               sectorId:
     *                 type: integer
     *                 description: ID of the sector this aisle belongs to
     *                 example: 1
     *     responses:
     *       201:
     *         description: Aisle created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Aisle'
     *       400:
     *         description: Invalid input data
     *       401:
     *         description: Unauthorized
     *       409:
     *         description: Aisle already exists
     *       500:
     *         description: Internal server error
     */
    async create(req, res) {
        const { body } = req;
        const { status, data } = await this.aisleService.create(body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /aisles/{id}:
     *   put:
     *     summary: Update an aisle
     *     tags: [Aisles]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Aisle ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Aisle name
     *                 example: "Updated Aisle A1"
     *               code:
     *                 type: string
     *                 description: Unique aisle code
     *                 example: "A1-UPDATED"
     *               sectorId:
     *                 type: integer
     *                 description: ID of the sector this aisle belongs to
     *                 example: 1
     *     responses:
     *       200:
     *         description: Aisle updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Aisle'
     *       400:
     *         description: Invalid input data
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Aisle not found
     *       500:
     *         description: Internal server error
     */
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.aisleService.update(+id, body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /aisles/{id}:
     *   delete:
     *     summary: Delete an aisle
     *     tags: [Aisles]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Aisle ID
     *     responses:
     *       200:
     *         description: Aisle deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Aisle deleted successfully"
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Aisle not found
     *       500:
     *         description: Internal server error
     */
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.aisleService.remove(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.AisleController = AisleController;
//# sourceMappingURL=AisleController.js.map