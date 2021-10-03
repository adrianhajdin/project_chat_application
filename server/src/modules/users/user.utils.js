const joi = require("joi");

const createSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  // not required fields
  aliases: joi.array().items(joi.string()),
  isEmailVerified: joi.boolean(),
  primaryAlias: joi.string(),
});

const updateSchema = joi.object().keys({
  id: joi.string().required(),
  email: joi.string().email(),
  password: joi.string().min(6),
  aliases: joi.array(),
  isEmailVerified: joi.boolean(),
  primaryAlias: joi.object(),
});

module.exports = { createSchema, updateSchema };
