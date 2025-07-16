"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotController = void 0;
const StatusCodes_1 = require("../utils/StatusCodes");
const SlotService_1 = require("../services/SlotService");
/**
 * @swagger
 * tags:
 *   name: Slots
 *   description: Slot management operations
 */
class SlotController {
    constructor(slotService = new SlotService_1.SlotService()) {
        this.slotService = slotService;
    }
    /**
     * @swagger
     * /slots:
     *   get:
     *     summary: Get all slots
     *     tags: [Slots]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of all slots
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Slot'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: No slots found
     *       500:
     *         description: Internal server error
     */
    async findAll(_req, res) {
        const { status, data } = await this.slotService.findAll();
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /slots/{id}:
     *   get:
     *     summary: Get slot by ID
     *     tags: [Slots]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Slot ID
     *     responses:
     *       200:
     *         description: Slot details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Slot'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Slot not found
     *       500:
     *         description: Internal server error
     */
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.slotService.findById(+id);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /slots/aisle/{aisleId}:
     *   get:
     *     summary: Get slots by aisle ID
     *     tags: [Slots]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: aisleId
     *         required: true
     *         schema:
     *           type: integer
     *         description: Aisle ID
     *     responses:
     *       200:
     *         description: List of slots in the aisle
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Slot'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: No slots found in aisle
     *       500:
     *         description: Internal server error
     */
    async findByAisle(req, res) {
        const { aisleId } = req.params;
        const { status, data } = await this.slotService.findByAisle(+aisleId);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /slots/status/{status}:
     *   get:
     *     summary: Get slots by status
     *     tags: [Slots]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: status
     *         required: true
     *         schema:
     *           type: string
     *           enum: [AVAILABLE, OCCUPIED, MAINTENANCE]
     *         description: Slot status
     *     responses:
     *       200:
     *         description: List of slots with the specified status
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Slot'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: No slots found with the specified status
     *       500:
     *         description: Internal server error
     */
    async findByStatus(req, res) {
        const { status: slotStatus } = req.params;
        const { status, data } = await this.slotService.findByStatus(slotStatus);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /slots/floor/{floor}:
     *   get:
     *     summary: Get slots by floor
     *     tags: [Slots]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: floor
     *         required: true
     *         schema:
     *           type: integer
     *         description: Floor number
     *     responses:
     *       200:
     *         description: List of slots on the specified floor
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Slot'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: No slots found on the specified floor
     *       500:
     *         description: Internal server error
     */
    async findByFloor(req, res) {
        const { floor } = req.params;
        const { status, data } = await this.slotService.findByFloor(+floor);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /slots:
     *   post:
     *     summary: Create a new slot
     *     tags: [Slots]
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
     *               - aisleId
     *             properties:
     *               name:
     *                 type: string
     *                 description: Slot name
     *                 example: "Slot A1-01"
     *               code:
     *                 type: string
     *                 description: Unique slot code
     *                 example: "A1-01"
     *               aisleId:
     *                 type: integer
     *                 description: ID of the aisle this slot belongs to
     *                 example: 1
     *               maxWeight:
     *                 type: number
     *                 description: Maximum weight capacity in kg
     *                 example: 1000
     *               floor:
     *                 type: integer
     *                 description: Floor number
     *                 example: 1
     *               status:
     *                 type: string
     *                 enum: [AVAILABLE, OCCUPIED, MAINTENANCE]
     *                 description: Slot status
     *                 example: "AVAILABLE"
     *     responses:
     *       201:
     *         description: Slot created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Slot'
     *       400:
     *         description: Invalid input data
     *       401:
     *         description: Unauthorized
     *       409:
     *         description: Slot already exists
     *       500:
     *         description: Internal server error
     */
    async create(req, res) {
        const { body } = req;
        const { status, data } = await this.slotService.create(body);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /slots/{id}:
     *   put:
     *     summary: Update a slot
     *     tags: [Slots]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Slot ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Slot name
     *                 example: "Updated Slot A1-01"
     *               code:
     *                 type: string
     *                 description: Unique slot code
     *                 example: "A1-01-UPDATED"
     *               aisleId:
     *                 type: integer
     *                 description: ID of the aisle this slot belongs to
     *                 example: 1
     *               maxWeight:
     *                 type: number
     *                 description: Maximum weight capacity in kg
     *                 example: 1200
     *               floor:
     *                 type: integer
     *                 description: Floor number
     *                 example: 2
     *               status:
     *                 type: string
     *                 enum: [AVAILABLE, OCCUPIED, MAINTENANCE]
     *                 description: Slot status
     *                 example: "OCCUPIED"
     *     responses:
     *       200:
     *         description: Slot updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Slot'
     *       400:
     *         description: Invalid input data
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Slot not found
     *       500:
     *         description: Internal server error
     */
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.slotService.update(+id, body);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /slots/{id}/status:
     *   patch:
     *     summary: Update slot status
     *     tags: [Slots]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Slot ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - status
     *             properties:
     *               status:
     *                 type: string
     *                 enum: [AVAILABLE, OCCUPIED, MAINTENANCE]
     *                 description: New slot status
     *                 example: "OCCUPIED"
     *     responses:
     *       200:
     *         description: Slot status updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Slot'
     *       400:
     *         description: Invalid status
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Slot not found
     *       500:
     *         description: Internal server error
     */
    async updateStatus(req, res) {
        const { id } = req.params;
        const { status: newStatus } = req.body;
        const { status, data } = await this.slotService.updateStatus(+id, newStatus);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /slots/{id}:
     *   delete:
     *     summary: Delete a slot
     *     tags: [Slots]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Slot ID
     *     responses:
     *       200:
     *         description: Slot deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Slot deleted successfully"
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Slot not found
     *       500:
     *         description: Internal server error
     */
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.slotService.remove(+id);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
}
exports.SlotController = SlotController;
//# sourceMappingURL=SlotController.js.map