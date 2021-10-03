const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("./user.repository");

module.exports = {
  async list(first, offset) {
    const users = await userRepo.listUsers(first, offset);
    return users;
  },

  async create(user) {
    const userExists = await this.getByemail(user.email);
    if (userExists) {
      throw Error("Email Already used before");
    }
    const hashedPassword = await this.hashPassword(user.password);

    const userCreated = await userRepo.create({ ...user, password: hashedPassword });
    return userCreated;
  },

  async login(email, password) {
    const user = await userRepo.findOneByEmail(email);
    if (user) {
      const isMatch = await this.comparePassword(user.password, password);
      if (isMatch) {
        var payload = { id: user.id };
        var token = jwt.sign(payload, process.env.JWT_SECRET);
        return { message: "ok", token: token };
      }
    }

    return { message: "invalid credentials" };
  },

  async update(id, user) {
    const updatedUser = await userRepo.update(id, user);
    return updatedUser;
  },

  async delete(id) {
    const deletedUser = await userRepo.delete(id);
    return deletedUser;
  },

  async getById(id) {
    const user = await userRepo.findOneById(id);
    return user;
  },

  async getByemail(email) {
    const user = await userRepo.findOneByEmail(email);
    return user;
  },

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  },

  async comparePassword(hashedPassword, password) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  },
};
