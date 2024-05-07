import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./libs/initialSetup.js";
import http from 'http';
<<<<<<< HEAD
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
=======
import WebSocket from 'ws';

const server = http.createServer(app);
const wss = WebSocket.Server(server);


// Hàm gửi tin nhắn tới tất cả các client
function sendRefreshMessage() {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send('refresh');
        }       
    });
}

// Endpoint để xử lý thay đổi dữ liệu và gửi yêu cầu làm mới trang web tới các client
app.get('/update-data', function (req, res) {
    // Xử lý thay đổi dữ liệu ở đây
    // Sau khi xử lý, gửi yêu cầu làm mới trang web tới tất cả các client
    sendRefreshMessage();
    res.send('Data updated');
});

wss.on('connection', function connection(ws) {
    console.log('New client connected');        

    ws.on('message', function incoming(message) {
        console.log('Received message:', message);
    });
});

server.listen(PORT, function listening() {
    console.log('Server started on port', PORT);
>>>>>>> 0296e808d227ada97ddbe7d4fbde7c6ea447636c
});
