import { Request, Router, Response } from 'express';
import { ProductController } from '../controllers/ProductController';
import { Authenticate } from '../middlewares/AuthMiddleware';
import { ProductValidator } from '../middlewares/ProductMiddleware';

const createProductRoutes = (): Router => {
  const router = Router();
  const productController = new ProductController();

  router.post(
    '/',
    Authenticate.authToken,
    ProductValidator.validateBody,
    (req: Request, res: Response) => productController.create(req, res),
  );

  router.get(
    '/',
    Authenticate.authToken,
    (req: Request, res: Response) => productController.findAll(req, res),
  );

  router.get(
    '/:id',
    Authenticate.authToken,
    ProductValidator.validateParams,
    (req: Request, res: Response) => productController.findById(req, res),
  );

  router.get(
    '/code/:code',
    Authenticate.authToken,
    ProductValidator.validateCodeParams,
    (req: Request, res: Response) => productController.findByCode(req, res),
  );

  router.get(
    '/unit/:unit',
    Authenticate.authToken,
    ProductValidator.validateUnitParams,
    (req: Request, res: Response) => productController.findByUnit(req, res),
  );

  router.put(
    '/:id',
    Authenticate.authToken,
    ProductValidator.validateParams,
    ProductValidator.validateUpdateBody,
    (req: Request, res: Response) => productController.update(req, res),
  );

  router.delete(
    '/:id',
    Authenticate.authToken,
    ProductValidator.validateParams,
    (req: Request, res: Response) => productController.remove(req, res),
  );

  return router;
};

export default createProductRoutes();
