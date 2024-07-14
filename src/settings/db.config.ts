import { config } from 'dotenv';

config();

export const dbConfig = () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DATABASE_SSL_ENABLED,
});
