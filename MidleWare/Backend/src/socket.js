import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();
export const io = new Server(server);

export default io;
