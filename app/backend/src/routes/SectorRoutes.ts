import { Request, Router, Response } from 'express';
import { Authenticate } from '../middlewares/AuthMiddleware';
import { SectorValidator } from '../middlewares/SectorMiddleware';
import { SectorController } from '../controllers/SectorController';

const createSectorRoutes = (): Router => {
  const router = Router();
  const sectorController = new SectorController();
  
  router.post(
    '/',
    Authenticate.authToken,
    SectorValidator.validateBody,
    (req: Request, res: Response) => sectorController.create(req, res),
  );

  router.get(
    '/',
    Authenticate.authToken,
    (req: Request, res: Response) => sectorController.findAll(req, res),
  );

  router.get(
    '/:id',
    Authenticate.authToken,
    SectorValidator.validateParams,
    (req: Request, res: Response) => sectorController.findById(req, res),
  );

  router.put(
    '/:id',
    Authenticate.authToken,
    SectorValidator.validateParams,
    SectorValidator.validateUpdateBody,
    (req: Request, res: Response) => sectorController.update(req, res),
  );

  router.delete(
    '/:id',
    Authenticate.authToken,
    SectorValidator.validateParams,
    (req: Request, res: Response) => sectorController.remove(req, res),
  );

  return router;
};

export default createSectorRoutes();