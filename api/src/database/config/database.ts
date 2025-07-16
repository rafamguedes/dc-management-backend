import { Options } from 'sequelize';

const isProduction = process.env.NODE_ENV === 'production';

const config: Options = {
  username: process.env.DB_USER || process.env.PGUSER,
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
  database: process.env.DB_NAME || process.env.PGDATABASE,
  host: process.env.DB_HOST || process.env.PGHOST,
  port: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432', 10),
  dialect: 'postgres',
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : undefined,
  ...(isProduction && {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  })
};

if (!config.username || !config.password || !config.database || !config.host) {
  throw new Error('Database configuration is incomplete. Please check your environment variables');
}

export = config;