import { Server } from 'socket.io';

var io;
export const initializeWebSocket = (server) => {
    io = new Server(server)

    io.on('connection', (socket) => {
        console.log('New client connected');
    });
};

export const sendNotification = (message) => {
    io.sockets.emit('notification', { message });
    console.log("----------------------\t",message);
};
