import { Router } from 'express';

const createHealthRoute = (): Router => {
  const router = Router();
  
  router.get('/', (_req, res) => res.status(200).send('Health Check OK!'));
  router.get('/health', (_req, res) => res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() }));
  
  return router;
};

export default createHealthRoute();