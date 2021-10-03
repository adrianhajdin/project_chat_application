const list = async (first, offset) => {};

const create = async (userData) => {};

const update = async (id, userData) => {};

const deleteUser = async (id) => {};

const findOneById = async (id) => {};

const findOneByEmail = async (email) => {};

module.exports = {
  list,
  create,
  update,
  findOneById,
  findOneByEmail,
  delete: deleteUser,
};
