import { Options } from 'sequelize';

const config: Options = {
  username: process.env.PGUSER || process.env.RAILWAY_PGUSER || 'postgres',
  password: process.env.PGPASSWORD || process.env.RAILWAY_PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || process.env.RAILWAY_PGDATABASE || 'dc_management_db',
  host: process.env.PGHOST || process.env.RAILWAY_PGHOST || 'localhost',
  port: Number(process.env.PGPORT || process.env.RAILWAY_PGPORT) || 5432,
  dialect: 'postgres',
};

export = config;