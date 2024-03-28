import { Request, Response } from 'express';
import { LoginService } from '../services/LoginService';
import { StatusCode } from '../utils/StatusCode';

class LoginController {
  private loginService: LoginService;

  constructor(loginService: LoginService = new LoginService()) {
    this.loginService = loginService;
  }

  public async authenticateUser({ body }: Request, res: Response): Promise<Response> {
    const { status, data } = await this.loginService.authenticateUser(body);
    return res.status(StatusCode(status)).json(data);
  }

  public async fetchUserRole(_req: Request, res: Response): Promise<Response> {
    const email = res.locals.user.email;
    const { status, data } = await this.loginService.fetchUserRole(email);
    return res.status(StatusCode(status)).json(data);
  }
}

export { LoginController };