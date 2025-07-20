import express = require('express');
import MainRoutes from './routes';
import CorsMiddleware from './middlewares/CorsMiddleware';

const configureApp = (app: express.Express): void => {
  app.use(CorsMiddleware);
  app.use(express.json());
  app.use(MainRoutes());
};

export const createApp = (): express.Express => {
  const app = express();
  configureApp(app);
  return app;
};
