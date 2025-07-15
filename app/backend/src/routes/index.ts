import { Router } from 'express';
import AuthRoutes from './AuthRoutes';
import HealthRoute from './HealthRoute';
import UserRoutes from './UserRoutes';
import SectorRoutes from './SectorRoutes';
import AisleRoutes from './AisleRoutes';
import SlotRoutes from './SlotRoutes';
import ProductRoutes from './ProductRoutes';
import PalletRoutes from './PalletRoutes';

const createMainRoutes = (): Router => {
  const router = Router();
  
  router.use('/', HealthRoute);
  router.use('/login', AuthRoutes);
  router.use('/user', UserRoutes);
  router.use('/sectors', SectorRoutes);
  router.use('/aisles', AisleRoutes);
  router.use('/slots', SlotRoutes);
  router.use('/products', ProductRoutes);
  router.use('/pallets', PalletRoutes);
  
  return router;
};

export default createMainRoutes();
