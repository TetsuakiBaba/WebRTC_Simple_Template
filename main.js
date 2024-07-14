const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let clients = 0;

io.on('connection', (socket) => {
    console.log('A user connected');
    clients++;

    socket.on('ready', () => {
        if (clients === 2) {
            io.emit('ready');
        }
    });

    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    socket.on('candidate', (candidate) => {
        socket.broadcast.emit('candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        clients--;
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
