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
  socket.emit('INIT', ('Welcome!'));

  socket.on('SEND_MESSAGE', function(data){
    console.log(data);
      io.emit('RECEIVE_MESSAGE', data);
  })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));