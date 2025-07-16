"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const StatusCodes_1 = require("../utils/StatusCodes");
const UserService_1 = require("../services/UserService");
class UserController {
    constructor(userService = new UserService_1.UserService()) {
        this.userService = userService;
    }
    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: User management operations
     */
    async findAll(_req, res) {
        const { status, data } = await this.userService.findAll();
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get user by ID
     *     tags: [Users]
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
     *         description: User found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: User not found
     */
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.userService.findById(+id);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request
     */
    async create(req, res) {
        const { body } = req;
        const { status, data } = await this.userService.create(body);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Update user by ID
     *     tags: [Users]
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
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: User updated successfully
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/User'
     *      400:
     *        description: Bad request
     *      404:
     *       description: User not found
     *      500:
     *       description: Internal server error
     * */
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const { status, data } = await this.userService.update(+id, body);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Delete user by ID
     *     tags: [Users]
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
     *         description: User deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "User deleted successfully"
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: User not found
     */
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.userService.remove(+id);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map