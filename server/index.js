const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.port || 5000;

app.use(router);

io.on('connection', (socket) => {
  io.emit('message', 'Welcome everybody!');

  socket.broadcast.emit('message', 'A new user has joined!');

  socket.on('sendMessage', (message, callback) => {
      io.emit('receiveMessage', message);

      callback();
    })

  socket.on('disconnect', () => {
    io.emit('message', 'User has left!');
  })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));