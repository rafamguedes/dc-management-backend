"use strict";
const dotenv = require("dotenv");
dotenv.config();
const config = {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    define: {
        timestamps: true,
    },
};
module.exports = config;
//# sourceMappingURL=database.js.map