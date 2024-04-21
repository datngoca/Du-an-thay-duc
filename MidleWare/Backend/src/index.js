import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./libs/initialSetup.js";
import http from 'http';
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
});
