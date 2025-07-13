import { Request, Router, Response } from 'express';
import { SlotController } from '../controllers/SlotController';
import { Authenticate } from '../middlewares/AuthMiddleware';
import { SlotValidator } from '../middlewares/SlotMiddleware';

const createSlotRoutes = (): Router => {
  const router = Router();
  const slotController = new SlotController();

  router.post(
    '/',
    Authenticate.authToken,
    SlotValidator.validateBody,
    (req: Request, res: Response) => slotController.create(req, res),
  );

  router.get(
    '/',
    Authenticate.authToken,
    (req: Request, res: Response) => slotController.findAll(req, res),
  );

  router.get(
    '/:id',
    Authenticate.authToken,
    SlotValidator.validateParams,
    (req: Request, res: Response) => slotController.findById(req, res),
  );

  router.get(
    '/aisle/:aisleId',
    Authenticate.authToken,
    SlotValidator.validateAisleParams,
    (req: Request, res: Response) => slotController.findByAisle(req, res),
  );

  router.get(
    '/status/:status',
    Authenticate.authToken,
    SlotValidator.validateStatusParams,
    (req: Request, res: Response) => slotController.findByStatus(req, res),
  );

  router.get(
    '/floor/:floor',
    Authenticate.authToken,
    SlotValidator.validateFloorParams,
    (req: Request, res: Response) => slotController.findByFloor(req, res),
  );

  router.put(
    '/:id',
    Authenticate.authToken,
    SlotValidator.validateParams,
    SlotValidator.validateUpdateBody,
    (req: Request, res: Response) => slotController.update(req, res),
  );

  router.put(
    '/:id/status',
    Authenticate.authToken,
    SlotValidator.validateParams,
    SlotValidator.validateStatusUpdate,
    (req: Request, res: Response) => slotController.updateStatus(req, res),
  );

  router.delete(
    '/:id',
    Authenticate.authToken,
    SlotValidator.validateParams,
    (req: Request, res: Response) => slotController.remove(req, res),
  );

  return router;
};

export default createSlotRoutes();