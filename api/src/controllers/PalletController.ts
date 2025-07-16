import { Request, Response } from 'express';
import { StatusCodes } from '../utils/StatusCodes';
import { PalletService } from '../services/PalletService';

/**
 * @swagger
 * tags:
 *   name: Pallets
 *   description: Pallet management operations
 */

export class PalletController {
  private palletService: PalletService;

  constructor(palletService: PalletService = new PalletService()) {
    this.palletService = palletService;
  }

  /**
   * @swagger
   * /pallets:
   *   get:
   *     summary: Get all pallets
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of all pallets
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pallet'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: No pallets found
   *       500:
   *         description: Internal server error
   */
  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.palletService.findAll();
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/{id}:
   *   get:
   *     summary: Get pallet by ID
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Pallet ID
   *     responses:
   *       200:
   *         description: Pallet details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pallet'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Pallet not found
   *       500:
   *         description: Internal server error
   */
  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.palletService.findById(+id);
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/slot/{slotId}:
   *   get:
   *     summary: Get pallets by slot ID
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: slotId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Slot ID
   *     responses:
   *       200:
   *         description: List of pallets in the slot
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pallet'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: No pallets found in slot
   *       500:
   *         description: Internal server error
   */
  public async findBySlot(req: Request, res: Response): Promise<Response> {
    const { slotId } = req.params;
    const { status, data } = await this.palletService.findBySlot(+slotId);
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/type/{type}:
   *   get:
   *     summary: Get pallets by type
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: type
   *         required: true
   *         schema:
   *           type: string
   *           enum: [master, single]
   *         description: Pallet type
   *     responses:
   *       200:
   *         description: List of pallets with the specified type
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pallet'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: No pallets found with the specified type
   *       500:
   *         description: Internal server error
   */
  public async findByType(req: Request, res: Response): Promise<Response> {
    const { type } = req.params;
    const { status, data } = await this.palletService.findByType(type as 'master' | 'single');
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/qrcode/{qrCode}:
   *   get:
   *     summary: Get pallet by QR code
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: qrCode
   *         required: true
   *         schema:
   *           type: string
   *         description: QR code
   *     responses:
   *       200:
   *         description: Pallet details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pallet'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Pallet not found
   *       500:
   *         description: Internal server error
   */
  public async findByQrCode(req: Request, res: Response): Promise<Response> {
    const { qrCode } = req.params;
    const { status, data } = await this.palletService.findByQrCode(qrCode);
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/qrcode-small/{qrCodeSmall}:
   *   get:
   *     summary: Get pallet by small QR code
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: qrCodeSmall
   *         required: true
   *         schema:
   *           type: string
   *         description: Small QR code
   *     responses:
   *       200:
   *         description: Pallet details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pallet'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Pallet not found
   *       500:
   *         description: Internal server error
   */
  public async findByQrCodeSmall(req: Request, res: Response): Promise<Response> {
    const { qrCodeSmall } = req.params;
    const { status, data } = await this.palletService.findByQrCodeSmall(qrCodeSmall);
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/unassigned:
   *   get:
   *     summary: Get unassigned pallets
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of unassigned pallets
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pallet'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: No unassigned pallets found
   *       500:
   *         description: Internal server error
   */
  public async findUnassigned(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.palletService.findUnassigned();
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets:
   *   post:
   *     summary: Create a new pallet
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - type
   *             properties:
   *               type:
   *                 type: string
   *                 enum: [master, single]
   *                 description: Pallet type
   *                 example: "master"
   *               slotId:
   *                 type: integer
   *                 description: Slot ID (optional - will be auto-assigned if available)
   *                 example: 1
   *               userId:
   *                 type: integer
   *                 description: User ID (optional)
   *                 example: 1
   *               productId:
   *                 type: integer
   *                 description: Product ID (optional)
   *                 example: 1
   *     responses:
   *       201:
   *         description: Pallet created successfully with automatic QR code generation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pallet'
   *       400:
   *         description: Invalid input data or no available slots
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: User or product not found
   *       500:
   *         description: Internal server error
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const { type, slotId, userId, productId } = req.body;
    const { status, data } = await this.palletService.create({
      type,
      slotId,
      userId,
      productId,
    });
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/{id}:
   *   put:
   *     summary: Update a pallet
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Pallet ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               type:
   *                 type: string
   *                 enum: [master, single]
   *                 description: Pallet type
   *                 example: "single"
   *               slotId:
   *                 type: integer
   *                 description: Slot ID
   *                 example: 2
   *               qrCode:
   *                 type: string
   *                 description: QR code
   *                 example: "QR-PALLET-001"
   *               qrCodeSmall:
   *                 type: string
   *                 description: Small QR code
   *                 example: "QR-SMALL-001"
   *     responses:
   *       200:
   *         description: Pallet updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pallet'
   *       400:
   *         description: Invalid input data
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Pallet not found
   *       500:
   *         description: Internal server error
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { type, slotId, qrCode, qrCodeSmall } = req.body;
    const { status, data } = await this.palletService.update(+id, {
      type,
      slotId,
      qrCode,
      qrCodeSmall,
    });
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/{id}/assign-slot:
   *   patch:
   *     summary: Assign pallet to slot
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Pallet ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - slotId
   *             properties:
   *               slotId:
   *                 type: integer
   *                 description: Slot ID to assign the pallet to
   *                 example: 1
   *     responses:
   *       200:
   *         description: Pallet assigned to slot successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pallet'
   *       400:
   *         description: Invalid slot ID or slot not available
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Pallet or slot not found
   *       500:
   *         description: Internal server error
   */
  public async assignToSlot(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { slotId } = req.body;
    const { status, data } = await this.palletService.assignToSlot(+id, slotId);
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/{id}/unassign-slot:
   *   patch:
   *     summary: Unassign pallet from slot
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Pallet ID
   *     responses:
   *       200:
   *         description: Pallet unassigned from slot successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pallet'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Pallet not found
   *       500:
   *         description: Internal server error
   */
  public async unassignFromSlot(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.palletService.unassignFromSlot(+id);
    return res.status(StatusCodes[status]).json(data);
  }

  /**
   * @swagger
   * /pallets/{id}:
   *   delete:
   *     summary: Delete a pallet
   *     tags: [Pallets]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Pallet ID
   *     responses:
   *       200:
   *         description: Pallet deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Pallet deleted successfully"
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Pallet not found
   *       500:
   *         description: Internal server error
   */
  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.palletService.remove(+id);
    return res.status(StatusCodes[status]).json(data);
  }
}
