import { Request, Router, Response } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LoginValidator } from '../middlewares/LoginMiddleware';

const createAuthRoutes = (): Router => {
  const router = Router();
  const authController = new AuthController();

  router.post(
    '/',
    LoginValidator.validateBody,
    (req: Request, res: Response) => authController.authenticateUser(req, res),
  );

  return router;
};

export default createAuthRoutes();