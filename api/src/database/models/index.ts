import { Sequelize } from 'sequelize';
import * as config from '../config/database';

const sequelize = new Sequelize(config);

// Add connection event handlers
sequelize.addHook('beforeConnect', (config) => {
  console.log('Attempting to connect to database...');
});

sequelize.addHook('afterConnect', (connection, config) => {
  console.log('Successfully connected to database');
});

sequelize.addHook('beforeDisconnect', (connection) => {
  console.log('Disconnecting from database...');
});

sequelize.addHook('afterDisconnect', (connection) => {
  console.log('Disconnected from database');
});

// Handle connection errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default sequelize;