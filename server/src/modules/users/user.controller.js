const { asyncRoute } = require("../../config/asyncRoute");
const userService = require("./user.service");

module.exports = {
  list: asyncRoute(async (req, res, next) => {
    const first = req.query.first && !isNaN(req.query.first) ? parseInt(req.query.first) : null;
    const offset = req.query.offset && !isNaN(req.query.offset) ? parseInt(req.query.offset) : null;

    const users = await userService.list(first, offset);
    return res.json({
      message: "success",
      data: users,
    });
  }),

  create: asyncRoute(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.create({ email, password });
    return res.status(200).json({
      message: "success",
      data: user,
    });
  }),
  update: asyncRoute(async (req, res, next) => {
    const { id } = req.params;
    const { email, password, isEmailVerified } = req.body;
    const updatedUser = await userService.update(id, {
      email,
      password,
      isEmailVerified,
    });

    return res.status(200).json({ message: "success", data: updatedUser });
  }),

  getById: asyncRoute(async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.status(200).json({
      message: "success",
      data: user,
    });
  }),

  login: asyncRoute(async (req, res, next) => {
    const { email, password } = req.body;

    const response = await userService.login(email, password);
    return res.status(200).json(response);
  }),

  delete: asyncRoute(async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await userService.delete(id);

    return res.status(200).json({ message: "success", data: deletedUser });
  }),
};
