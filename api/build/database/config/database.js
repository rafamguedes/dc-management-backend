"use strict";
const dotenv = require("dotenv");
dotenv.config();
const config = {
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'dc_management_db',
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
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