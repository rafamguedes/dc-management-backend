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
  
  router.get('/', (_req, res) => res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() }));
  
  router.use('/health', HealthRoute);
  router.use('/docs', DocsRoute);
  router.use('/auth', AuthRoutes);
  router.use('/users', UserRoutes);
  router.use('/sectors', SectorRoutes);
  router.use('/aisles', AisleRoutes);
  router.use('/slots', SlotRoutes);
  router.use('/products', ProductRoutes);
  router.use('/pallets', PalletRoutes);

  return router;
};

export default createMainRoutes;