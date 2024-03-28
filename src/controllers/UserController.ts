import { Request, Response } from 'express';
import { StatusCode } from '../utils/StatusCode';
import { UserService } from '../services/UserService';
import { IUserUpdate } from '../interfaces/User/IUser';

class UserController {
  private userService: UserService;

  constructor(userService: UserService = new UserService()) {
    this.userService = userService;
  }


  public async getAllUsers(_req: Request, res: Response): Promise<Response> {
    // 
    const { status, data } = await this.userService.getAllUsers();

    return res.status(StatusCode(status)).json(data);
  }


  public async registerUser(req: Request, res: Response): Promise<Response> {
    // 
    const { body } = req;

    const { status, data } = await this.userService.registerUser(body);

    return res.status(StatusCode(status)).json(data);
  }


  public async updateUser(req: Request, res: Response): Promise<Response> {
    //
    const { body } = req;
    const { id } = req.params;

    const { status, data } = await this.userService.updateUser(Number(id), body);

    return res.status(StatusCode(status)).json(data);
  }
  
}

export { UserController };