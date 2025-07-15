import { Request, Router, Response } from 'express';
import { AisleController } from '../controllers/AisleController';
import { AisleValidator } from '../middlewares/AisleMiddleware';
import { Authenticate } from '../middlewares/AuthMiddleware';

const createAisleRoutes = (): Router => {
  const router = Router();
  const aisleController = new AisleController();

  router.post(
    '/',
    Authenticate.authToken,
    AisleValidator.validateBody,
    (req: Request, res: Response) => aisleController.create(req, res),
  );

  router.get(
    '/',
    Authenticate.authToken,
    (req: Request, res: Response) => aisleController.findAll(req, res),
  );

  router.get(
    '/:id',
    Authenticate.authToken,
    AisleValidator.validateParams,
    (req: Request, res: Response) => aisleController.findById(req, res),
  );

  router.get(
    '/sector/:sectorId',
    Authenticate.authToken,
    AisleValidator.validateSectorParams,
    (req: Request, res: Response) => aisleController.findBySector(req, res),
  );

  router.put(
    '/:id',
    Authenticate.authToken,
    AisleValidator.validateParams,
    AisleValidator.validateUpdateBody,
    (req: Request, res: Response) => aisleController.update(req, res),
  );

  router.delete(
    '/:id',
    Authenticate.authToken,
    AisleValidator.validateParams,
    (req: Request, res: Response) => aisleController.remove(req, res),
  );

  return router;
};

export default createAisleRoutes();