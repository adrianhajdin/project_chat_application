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
  console.log('New WebSocket connection')

  socket.on('join', ({ name, room }) => {
    socket.join(room);

    socket.emit('message', `${name}, welcome to room ${room}.`);
    socket.broadcast.to(room).emit('message', `${name} has joined!`);
  });

  socket.on('sendMessage', (message, callback) => {
    console.log('REACH SEND MESSAGE')
    io.emit('message', message);

    io.to('test').emit('message', message);

    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', 'User has left!');
  })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));