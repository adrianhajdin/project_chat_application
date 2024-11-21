const User = require("./user.model");

const list = async (first, offset) => {
  const users = await User.findAll({ where: {} });

  return users;
};

const create = async (userData) => {
  const user = await User.create(userData);

  return user;
};

const update = async (id, userData) => {
  const user = await User.update(userData, { where: { id: id } });

  return user;
};

const deleteUser = async (id) => {
  const num = await User.destroy({ where: { id: id } });
};

const findOneById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (user == null) throw new Error(`User With id: ${id} not found`);
  return user;
};

const findOneByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

module.exports = {
  list,
  create,
  update,
  findOneById,
  findOneByEmail,
  delete: deleteUser,
};
