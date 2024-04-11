dotenv.config();
import sql from 'mssql';
import dotenv from 'dotenv';


const SQL_SERVER_CONFIG = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
};

const sqlConfig = {
  user: SQL_SERVER_CONFIG.user,
  password: SQL_SERVER_CONFIG.password,
  server: SQL_SERVER_CONFIG.server,
  database: SQL_SERVER_CONFIG.database,
  options: {
      encrypt: true, // For Azure SQL
      trustServerCertificate: true, // For Azure SQL
  },
};

export default sqlConfig;