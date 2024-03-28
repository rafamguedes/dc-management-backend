import { Router } from 'express';
import LoginRoutes from './LoginRoutes';
import HealthRoute from './HealthRoute';
import UserRoutes from './UserRoutes';

export default class MainRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.use('/', HealthRoute);
    this.router.use('/login', LoginRoutes);
    this.router.use('/user', UserRoutes);
  }
}
