import { Router } from 'express';
import AuthRoutes from './AuthRoutes';
import HealthRoute from './HealthRoute';
import UserRoutes from './UserRoutes';
import SectorRoutes from './SectorRoutes';
import AisleRoutes from './AisleRoutes';
import SlotRoutes from './SlotRoutes';
import ProductRoutes from './ProductRoutes';
import PalletRoutes from './PalletRoutes';
import DocsRoute from './DocsRoute';

const createMainRoutes = (): Router => {
  const router = Router();
  
  // Health check route
  router.use('/', HealthRoute);
  
  // Documentation route
  router.use('/docs', DocsRoute);
  
  // API routes with version prefix
  const apiRouter = Router();
  
  // Auth routes
  apiRouter.use('/auth', AuthRoutes);
  
  // Resource routes
  apiRouter.use('/users', UserRoutes);
  apiRouter.use('/sectors', SectorRoutes);
  apiRouter.use('/aisles', AisleRoutes);
  apiRouter.use('/slots', SlotRoutes);
  apiRouter.use('/products', ProductRoutes);
  apiRouter.use('/pallets', PalletRoutes);
  
  // Mount API router with version prefix
  router.use('/api/v1', apiRouter);
  
  return router;
};

export default createMainRoutes;