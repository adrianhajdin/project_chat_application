const { Sequelize, sequelize } = require("../../../database/db.connection");

const User = sequelize.define("users", {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  updated_at: {
    type: Sequelize.TIME,
  },
  created_at: {
    type: Sequelize.TIME,
  },
});

module.exports = User;
