import { Options } from 'sequelize';

const config: Options = {
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'dc_management_db',
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  dialect: 'postgres',
};

export = config;