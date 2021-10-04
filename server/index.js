require("dotenv").config({ path: ".env" });

const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const errorHanlder = require("./src/config/errorHandler");
const db = require("./database/db.connection");

require("./src/config/passport");

const port = process.env.NODE_PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// swagger file
const swaggerFile = require("./swagger.json");

// passport init
app.use(passport.initialize());

// morgan to log requests
app.use(morgan("dev"));

// body parser json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// db connection
db.sequelize.sync();

// require the routes
require("./src/config/routes")(app);

// global handle error middleware
app.use(errorHanlder);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/health", (req, res) => {
  return res.json({ status: true });
});

// socket io connection
io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: "Admin", text: `${user.name} has left.` });
      io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

server.listen(port, () => console.log(`Server has started. on port ${port}`));
