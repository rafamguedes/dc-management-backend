import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { StatusCodes } from '../utils/StatusCode';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService = new AuthService()) {
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
  public async authenticateUser({ body }: Request, res: Response): Promise<Response> {
    const { status, data } = await this.authService.authenticateUser(body);
    return res.status(StatusCodes[status]).json(data);
  }
}

export { AuthController };