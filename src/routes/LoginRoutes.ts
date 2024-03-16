import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import Authenticate from '../middlewares/AuthMiddleware';

class LoginRoutes {
  //
  public router: Router;
  
  private loginController: LoginController;

  constructor() {
    //
    this.router = Router();
    this.loginController = new LoginController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //
    this.router.post(
      '/',
      LoginMiddleware,
      (req: Request, res: Response) => this.loginController.signUp(req, res),
    );

    this.router.get(
      '/role',
      Authenticate,
      (req: Request, res: Response) => this.loginController.getUserRole(req, res),
    );
  }
}

export default new LoginRoutes().router;