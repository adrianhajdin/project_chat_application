const authRouter = require("express").Router();
const { validateCreate } = require("../users/middlewares");
const userController = require("../users/user.controller");

authRouter.post("/login", userController.login);
authRouter.post("/register", [validateCreate], userController.create);

module.exports = authRouter;
