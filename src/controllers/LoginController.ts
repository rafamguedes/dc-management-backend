//
import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import statusCode from '../utils/StatusCode';

export default class LoginController {
  //
  constructor(private loginService = new LoginService()) { }

  public async signUp(req: Request, res: Response): Promise<Response> {
    //
    const { status, data } = await this.loginService.signUp(req.body);
    return res.status(statusCode(status)).json(data);
  }

  public async getUserRole(_req: Request, res: Response): Promise<Response> {
    //
    const { status, data } = await this.loginService.getRole(res.locals.user.email);
    return res.status(statusCode(status)).json(data);
  }
}
