import { Request, Router, Response } from 'express';
import { LoginController } from '../controllers/LoginController';
import { LoginValidator } from '../middlewares/LoginMiddleware';
import { Authenticate } from '../middlewares/AuthMiddleware';

class LoginRoutes {
  public router: Router;
  
  private loginController: LoginController;

  constructor() {
    this.router = Router();
    this.loginController = new LoginController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/',
      LoginValidator.validateBody,
      (req: Request, res: Response) => this.loginController.authenticateUser(req, res),
    );

    this.router.get(
      '/role',
      Authenticate.authToken,
      (req: Request, res: Response) => this.loginController.fetchUserRole(req, res),
    );
  }
}

export default new LoginRoutes().router;