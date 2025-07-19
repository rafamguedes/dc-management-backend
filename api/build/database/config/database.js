"use strict";
const dotenv = require("dotenv");
const pg_connection_string_1 = require("pg-connection-string");
dotenv.config();
const databaseUrl = process.env.DATABASE_URL;
const parsedUrl = databaseUrl ? (0, pg_connection_string_1.parse)(databaseUrl) : null;
const config = {
    username: (parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.user) || process.env.PGUSER || 'postgres',
    password: (parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.password) || process.env.PGPASSWORD || 'postgres',
    database: (parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.database) || process.env.PGDATABASE || 'dc_management_db',
    host: (parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.host) || process.env.PGHOST || 'localhost',
    port: (parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.port) ? Number(parsedUrl.port) : Number(process.env.PGPORT) || 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false,
        } : false,
        // Add connection timeout settings
        connectTimeout: 60000,
        socketTimeout: 60000,
        acquireTimeout: 60000,
    },
    pool: {
        max: 5, // Maximum number of connections in pool
        min: 0, // Minimum number of connections in pool
        acquire: 30000, // Maximum time to get connection before throwing error
        idle: 10000, // Maximum time connection can be idle before being released
        evict: 1000, // Check for idle connections every 1 second
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    retry: {
        match: [
            /ConnectionError/,
            /ConnectionRefused/,
            /ConnectionTimedOut/,
            /TimeoutError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeConnectionTimedOutError/,
        ],
        max: 3,
    },
};
module.exports = config;
//# sourceMappingURL=database.js.map