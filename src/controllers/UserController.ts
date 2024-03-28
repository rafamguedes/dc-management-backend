import { Request, Response } from 'express';
import { StatusCode } from '../utils/StatusCode';
import { UserService } from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor(userService: UserService = new UserService()) {
    this.userService = userService;
  }

  public async registerUser(req: Request, res: Response): Promise<Response> {
    // 
    const { body } = req;

    const response = await this.userService.registerUser(body);

    return res.status(StatusCode(response.status)).json(response.data);
  }
}

export { UserController };