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
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
};
module.exports = config;
//# sourceMappingURL=database.js.map