import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { StatusCodes } from '../utils/StatusCode';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService = new AuthService()) {
    this.authService = authService;
  }

  public async authenticateUser({ body }: Request, res: Response): Promise<Response> {
    const { status, data } = await this.authService.authenticateUser(body);
    return res.status(StatusCodes[status]).json(data);
  }
}

export { AuthController };