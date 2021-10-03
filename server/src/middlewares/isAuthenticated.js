const passport = require("passport");

module.exports.isAuthenticated = () => passport.authenticate("jwt");
