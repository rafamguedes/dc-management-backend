import express = require('express');

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.app.get('/', (_req, res) => res.status(200).send('App is running!'));
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port: ${PORT}!!`));
  }
}

export default App;
