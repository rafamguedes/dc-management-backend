import { Router } from 'express';
import { apiReference } from '@scalar/express-api-reference';
import { swaggerSpec } from '../config/swagger';

const router = Router();

router.use('/swagger', apiReference({
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
      --scalar-color-1: #1f2937;
      --scalar-color-2: #374151;
      --scalar-color-3: #4b5563;
      --scalar-color-accent: #3b82f6;
      --scalar-border-color: #e5e7eb;
      --scalar-background-1: #ffffff;
      --scalar-background-2: #f9fafb;
      --scalar-background-3: #f3f4f6;
    }
  `,
}));

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default router;
