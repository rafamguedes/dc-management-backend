import { Router } from 'express';
import db from '../database/models';

const createHealthRoute = (): Router => {
  const router = Router();
  
  router.get('/', async (_req, res) => {
    try {
      // Test database connection
      await db.authenticate();
      res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'connected',
        uptime: process.uptime(),
        memory: process.memoryUsage()
      });
    } catch (error) {
      console.error('Health check failed:', error);
      res.status(503).json({ 
        status: 'ERROR', 
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        uptime: process.uptime(),
        memory: process.memoryUsage()
      });
    }
  });
  
  return router;
};

export default createHealthRoute();