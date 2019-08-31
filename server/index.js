const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.port || 5000;

app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }) => {
    socket.join(room);

    socket.emit('message', { text : `${name}, welcome to room ${room}.`});
    socket.broadcast.to(room).emit('message', { text: `${name} has joined!` });
  });

  socket.on('sendMessage', (message, callback) => {
    io.emit('message', message);

    callback();
  });

  socket.on('disconnect', () => {
    io.to('Test').emit('message', { text: 'User left.' });
  })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));