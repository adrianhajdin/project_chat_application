const userRouter = require("express").Router();
const { validateCreate, validateUpdate } = require("./middlewares");
const userController = require("./user.controller");

userRouter.get("/:id", userController.getById);
userRouter.get("/", userController.list);
userRouter.post("/", [validateCreate], userController.create);
userRouter.put("/:id", [validateUpdate], userController.update);
userRouter.delete("/:id", userController.delete);

module.exports = userRouter;
