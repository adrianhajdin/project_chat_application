const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.port || 5000;

app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', { text : `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { text: `${user.name} has joined!` });

    callback()
  });

  socket.on('sendMessage', (message, callback) => {
    io.emit('message', message);

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { text: `${user.name} has left.` })
    }
  })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));