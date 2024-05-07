import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./libs/initialSetup.js";
import http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:19335"],
        method: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log('A user connected to socket');



    //listen to a connection
    socket.on("payroll", () => {
    })
    socket.on("createdEmployee", (message) => {
        io.emit("Employee", message)
    })
    socket.on("deletedEmployee", (message) => {
        console.log("xoa thanh cong")
        io.emit("Employee", message)
    })
    socket.on("editEmployee", (message) => {
        io.emit("Employee", message)
    })

    socket.on("HR", () => {
    })
    socket.on("createdPersonal", (message) => {
        io.emit("Personal", message)
    })
    socket.on("deletedPersonal", (message) => {
        io.emit("Personal", message)
    })
    socket.on("editPersonal", (message) => {
        io.emit("Personal", message)
    })

    // socket.on("deletedPersonalHR", (socialSecurityNumber) => {
    //     console.log('Received socialSecurityNumber:', socialSecurityNumber);
    //     // Xử lý sự kiện khi nhận được 'deletedPersonalHR' từ client
    // });


    socket.on('disconnect', () => {
        console.log('User disconnected from socket');
    });
    console.log("new connection", socket.id)
});

// Pass 'io' to app.locals so that it's accessible within controllers

httpServer.listen(PORT, () => {
    console.log("Server on port", PORT);
});
