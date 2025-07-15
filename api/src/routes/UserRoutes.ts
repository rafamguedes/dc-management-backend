import { Request, Router, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { UserValidator } from '../middlewares/UserMiddleware';
import { Authenticate } from '../middlewares/AuthMiddleware';

const createUserRoutes = (): Router => {
  const router = Router();
  const userController = new UserController();
  
  router.post(
    '/',
    UserValidator.validateBody,
    (req: Request, res: Response) => userController.create(req, res),
  );

  router.get(
    '/',
    Authenticate.authToken,
    (req: Request, res: Response) => userController.findAll(req, res),
  );

  router.get(
    '/:id',
    Authenticate.authToken,
    (req: Request, res: Response) => userController.findById(req, res),
  );

  router.put(
    '/:id',
    Authenticate.authToken,
    UserValidator.validateParams,
    UserValidator.validateUpdateBody,
    (req: Request, res: Response) => userController.update(req, res),
  );

  router.delete(
    '/:id',
    Authenticate.authToken,
    UserValidator.validateParams,
    (req: Request, res: Response) => userController.remove(req, res),
  );

  return router;
};

export default createUserRoutes();