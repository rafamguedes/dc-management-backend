import { Router, Request, Response } from 'express';
import { PalletProductController } from '../controllers/PalletProductController';
import { Authenticate } from '../middlewares/AuthMiddleware';
import { PalletProductValidator } from '../middlewares/PalletProductMiddleware';

const router = Router();

// Public endpoints for inventory viewing
router.get('/details', async (req: Request, res: Response) => {
  const palletProductController = new PalletProductController();
  await palletProductController.findWithDetails(req, res);
});

router.get('/expired', async (req: Request, res: Response) => {
  const palletProductController = new PalletProductController();
  await palletProductController.findExpired(req, res);
});

router.get('/expiring/:days?', 
  PalletProductValidator.validateDaysParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.findExpiringSoon(req, res);
  }
);

router.get('/summary', async (req: Request, res: Response) => {
  const palletProductController = new PalletProductController();
  await palletProductController.getInventorySummary(req, res);
});

// Protected routes - require authentication
router.use(Authenticate.authToken);

// Get all pallet products
router.get('/', async (req: Request, res: Response) => {
  const palletProductController = new PalletProductController();
  await palletProductController.findAll(req, res);
});

// Get pallet product by ID
router.get('/:id', 
  PalletProductValidator.validateParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.findById(req, res);
  }
);

// Get pallet products by pallet ID
router.get('/pallet/:palletId', 
  PalletProductValidator.validatePalletParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.findByPalletId(req, res);
  }
);

// Get pallet products by pallet ID with details
router.get('/pallet/:palletId/details', 
  PalletProductValidator.validatePalletParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.findByPalletIdWithDetails(req, res);
  }
);

// Get pallet products by product ID
router.get('/product/:productId', 
  PalletProductValidator.validateProductParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.findByProductId(req, res);
  }
);

// Get pallet products by product ID with details
router.get('/product/:productId/details', 
  PalletProductValidator.validateProductParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.findByProductIdWithDetails(req, res);
  }
);

// Create new pallet product
router.post('/', 
  PalletProductValidator.validateBody,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.create(req, res);
  }
);

// Bulk create pallet products
router.post('/bulk', 
  PalletProductValidator.validateBulkCreate,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.bulkCreate(req, res);
  }
);

// Update pallet product
router.put('/:id', 
  PalletProductValidator.validateParams,
  PalletProductValidator.validateUpdateBody,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.update(req, res);
  }
);

// Delete pallet product
router.delete('/:id', 
  PalletProductValidator.validateParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.remove(req, res);
  }
);

// Delete all pallet products for a specific pallet
router.delete('/pallet/:palletId', 
  PalletProductValidator.validatePalletParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.removeByPallet(req, res);
  }
);

// Delete all pallet products for a specific product
router.delete('/product/:productId', 
  PalletProductValidator.validateProductParams,
  async (req: Request, res: Response) => {
    const palletProductController = new PalletProductController();
    await palletProductController.removeByProduct(req, res);
  }
);

export default router;
