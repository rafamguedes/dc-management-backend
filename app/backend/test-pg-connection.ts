import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'auth_db',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: console.log,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection has been established successfully.');
    
    // Test basic query
    const result = await sequelize.query('SELECT version();');
    console.log('📋 PostgreSQL version:', result[0]);
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL database:', error);
  }
}

testConnection();
