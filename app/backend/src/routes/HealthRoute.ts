import { Router } from 'express';

const createHealthRoute = (): Router => {
  const router = Router();
  
  router.get('/', (_req, res) => res.status(200).send('Health Check OK!'));
  
  return router;
};

export default createHealthRoute();