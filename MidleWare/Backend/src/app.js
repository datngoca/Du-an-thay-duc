import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import sql from 'mssql';
import dotenv from 'dotenv';
import mysql from 'mysql2';

// Import các cấu hình kết nối
import sqlConfig from './sqlConfig.js';
import { connectToMySQL } from './mysqlConfig.js';

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Kết nối đến SQL Server
async function connectToSqlServer() {
  try {
    await sql.connect(sqlConfig);
    console.log("Connected to SQL Server");
  } catch (error) {
    console.error("Error connecting to SQL Server:", error.message);
  }
} 


// Kết nối khi ứng dụng khởi động
connectToSqlServer();
connectToMySQL();//Dung tu mysqlConfig.js

// Routes
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import payrateRoutes from './routes/payrate.routes.js'
import personalRoutes from './routes/personal.router.js'
import jobHistoryRoutes from "./routes/jobHistory.routes.js";
import benefitRoutes from "./routes/benefitplan.routes.js";
import sqlRoutes from "./routes/sqlRouter.js";

app.use("/api/sql", sqlRoutes);
app.use("/api", indexRoutes);
app.use("/api/jobHistory", jobHistoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);

app.use("/api/payrate", payrateRoutes);
app.use("/api/personal", personalRoutes);
app.use("/api/benefitplan",benefitRoutes);

// Route test
app.get('/', (req, res)=> {
  res.json("helmet")
});

export default app;
