import { Router } from 'express';

class HealthRoute {
  //
  public router: Router;

  constructor() {
    //
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //
    this.router.get('/', (_req, res) => res.status(200).send('Health Check OK!'));
  }
}

export default new HealthRoute().router;