import { Options } from 'sequelize';
import * as dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const parsedUrl = databaseUrl ? parse(databaseUrl) : null;

const config: Options = {
  username: parsedUrl?.user || process.env.PGUSER || 'postgres',
  password: parsedUrl?.password || process.env.PGPASSWORD || 'postgres',
  database: parsedUrl?.database || process.env.PGDATABASE || 'dc_management_db',
  host: parsedUrl?.host || process.env.PGHOST || 'localhost',
  port: parsedUrl?.port ? Number(parsedUrl.port) : Number(process.env.PGPORT) || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
};

export = config;