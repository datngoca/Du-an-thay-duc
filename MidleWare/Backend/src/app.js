import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();
import io from './socket.js';


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
import sqlConfig from './sqlConfig.js';
import mysqlConfig from './mysqlConfig.js'
// import { initializeWebSocket } from './websocket.js';

import { PORT } from "./config.js";
import http from "http";


const app = express();
// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connectToSqlServer() {
  try {
    await sql.connect(sqlConfig);
    console.log("Connected to SQL Server");
  } catch (error) {
    console.error("Error connecting to SQL Server:", error.message);
  }
} 
const server = http.createServer(app);
async function connectToMySQL() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL!");

    // Do something with the connection if needed...

    connection.release(); // Trả lại kết nối vào pool khi không cần thiết nữa
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
  }
}
connectToMySQL();

// io.attach(server);
// server.PORT=4000
// console.log(io.PORT)
// console.log(app.PORT,"-----------------------------",server.PORT)
// io.on('connection', (socket) => {
//   console.log('New client connected');
// });


//initializeWebSocket(server)
connectToSqlServer();
// Routes[=]
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
app.get('/', (req, res)=> {
  res.json("helmet")

});

export default app;
