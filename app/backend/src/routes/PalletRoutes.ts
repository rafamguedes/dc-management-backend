import { Router, Request, Response } from 'express';
import { PalletController } from '../controllers/PalletController';
import { Authenticate } from '../middlewares/AuthMiddleware';
import { PalletValidator } from '../middlewares/PalletMiddleware';

const router = Router();

// Public endpoint to check unassigned pallets
router.get('/unassigned', async (req: Request, res: Response) => {
  const palletController = new PalletController();
  await palletController.findUnassigned(req, res);
});

// Public endpoint to find pallet by main QR code
router.get('/qr/:qrCode', 
  PalletValidator.validateQrCodeParams,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.findByQrCode(req, res);
  }
);

// Public endpoint to find pallet by small QR code
router.get('/qrsmall/:qrCodeSmall', 
  PalletValidator.validateQrCodeSmallParams,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.findByQrCodeSmall(req, res);
  }
);

// Protected routes - require authentication
router.use(Authenticate.authToken);

// Get all pallets
router.get('/', async (req: Request, res: Response) => {
  const palletController = new PalletController();
  await palletController.findAll(req, res);
});

// Get pallet by ID
router.get('/:id', 
  PalletValidator.validateParams,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.findById(req, res);
  }
);

// Get pallets by type
router.get('/type/:type', 
  PalletValidator.validateTypeParams,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.findByType(req, res);
  }
);

// Get pallets by slot ID
router.get('/slot/:slotId', 
  PalletValidator.validateSlotParams,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.findBySlot(req, res);
  }
);

// Create new pallet
router.post('/', 
  PalletValidator.validateBody,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.create(req, res);
  }
);

// Update pallet
router.put('/:id', 
  PalletValidator.validateParams,
  PalletValidator.validateUpdateBody,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.update(req, res);
  }
);

// Delete pallet
router.delete('/:id', 
  PalletValidator.validateParams,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.remove(req, res);
  }
);

// Assign pallet to slot
router.patch('/:id/assign', 
  PalletValidator.validateParams,
  PalletValidator.validateAssignSlot,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.assignToSlot(req, res);
  }
);

// Unassign pallet from slot
router.patch('/:id/unassign', 
  PalletValidator.validateParams,
  async (req: Request, res: Response) => {
    const palletController = new PalletController();
    await palletController.unassignFromSlot(req, res);
  }
);

export default router;
