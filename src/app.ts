//
import express = require('express');
import MainRoutes from './routes';

class App {
  //
  public app: express.Express;
  
  private mainRoutes: MainRoutes = new MainRoutes();

  constructor() {
    this.app = express();
    this.mainRoutes = new MainRoutes();
    this.app.use(express.json());
    this.routes();
  }

  private routes(): void {
    this.app.use(this.mainRoutes.router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port: ${PORT}!!`));
  }
}

export { App };

export const { app } = new App();
