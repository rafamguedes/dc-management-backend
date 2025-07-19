"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = require("../config/database");
const sequelize = new sequelize_1.Sequelize(config);
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
exports.default = sequelize;
//# sourceMappingURL=index.js.map