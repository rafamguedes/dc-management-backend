import { Router } from 'express';
import { apiReference } from '@scalar/express-api-reference';
import { swaggerSpec } from '../config/swagger';

const router = Router();

// Scalar API Documentation
router.use('/docs', apiReference({
  theme: 'kepler',
  spec: {
    content: swaggerSpec,
  },
  metaData: {
    title: 'Warehouse Management API Documentation',
    description: 'Complete API documentation for the warehouse management system',
    ogDescription: 'Warehouse Management API with authentication, inventory tracking, and QR code integration',
  },
  customCss: `
    .scalar-app {
      --scalar-color-1: #121212;
      --scalar-color-2: #1e1e1e;
      --scalar-color-3: #2d2d2d;
      --scalar-color-accent: #3b82f6;
      --scalar-border-color: #404040;
      --scalar-background-1: #0f0f0f;
      --scalar-background-2: #1a1a1a;
      --scalar-background-3: #262626;
    }
  `,
}));

// Alternative: Traditional Swagger UI endpoint
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default router;
