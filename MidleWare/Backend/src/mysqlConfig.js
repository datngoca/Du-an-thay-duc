// Import the necessary libraries
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a MySQL connection pool
const MySQL_SERVER_CONFIG = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
  };
  
  const sqlConfig = {
    user: MySQL_SERVER_CONFIG_SERVER_CONFIG.user,
    password: MySQL_SERVER_CONFIGSQL_SERVER_CONFIG.password,
    server: MySQL_SERVER_CONFIG.server,
    database: MySQL_SERVER_CONFIG.database,
  };

// Export the pool for use in other modules
export default sqlConfig;
