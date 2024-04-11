import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const MySQL_SERVER_CONFIG = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const mysqlConfig = {
  host: MySQL_SERVER_CONFIG.host,
  user: MySQL_SERVER_CONFIG.user,
  port: MySQL_SERVER_CONFIG.port,
  password: MySQL_SERVER_CONFIG.password,
  database: MySQL_SERVER_CONFIG.database,
};
const pool = mysql.createPool(mysqlConfig);

// Hàm kết nối đến MySQL
async function connectToMySQL() {
  try {
    const connection = await pool.promise().getConnection();
    console.log("Connected to MySQL!");

    // Do something with the connection if needed...

    connection.release();
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
  }
}

export { connectToMySQL };
