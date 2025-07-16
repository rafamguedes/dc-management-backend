"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const StatusCode_1 = require("../utils/StatusCode");
class AuthController {
    constructor(authService = new AuthService_1.AuthService()) {
        this.authService = authService;
    }
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Authenticate user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: User authenticated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       401:
     *         description: Unauthorized
     */
    async authenticateUser({ body }, res) {
        const { status, data } = await this.authService.authenticateUser(body);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map