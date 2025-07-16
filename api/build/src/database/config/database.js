"use strict";
const config = {
    username: process.env.PGUSER || 'root',
    password: process.env.PGPASSWORD || 'root',
    database: process.env.PGDATABASE || 'auth_db',
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    dialect: 'postgres',
};
module.exports = config;
//# sourceMappingURL=database.js.map