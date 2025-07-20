import { createApp } from './app';

const PORT = process.env.PORT || 3001;

const startServer = () => {
  const app = createApp();
  
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}!!`);
  });
};

startServer();