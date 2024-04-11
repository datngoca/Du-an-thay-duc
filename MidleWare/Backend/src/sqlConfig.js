dotenv.config();
import sql from 'mssql';
import dotenv from 'dotenv';


const SQL_SERVER_CONFIG = {
  user: process.env.SQL_SERVER_USER,
  password: process.env.SQL_SERVER_PASSWORD,
  server: process.env.SQL_SERVER_SERVER,
  database: process.env.SQL_SERVER_DATABASE,
};

const sqlConfig = {
  user: SQL_SERVER_CONFIG.user,
  password: SQL_SERVER_CONFIG.password,
  server: SQL_SERVER_CONFIG.server,
  database: SQL_SERVER_CONFIG.database,
  options: {
      encrypt: false, // For Azure SQL
  },
};

export default sqlConfig;