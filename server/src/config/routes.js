// middleware for authenticate users
const { isAuthenticated } = require("../middlewares/isAuthenticated");

// routers
const userRouter = require("../modules/users/user.routes");
const authRouter = require("../modules/auth/auth.routes");

module.exports = (app) => {
  app.use("/auth", authRouter);
  app.use("/users", [isAuthenticated()], userRouter);
};
