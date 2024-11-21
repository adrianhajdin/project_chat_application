const { validateSchema } = require("../shared/validateSchema");
const { createSchema, updateSchema } = require("./user.utils");

const validateCreate = (req, res, next) => {
  const validationErrors = validateSchema(createSchema, req.body);

  if (validationErrors.length > 0) {
    throw Error(validationErrors);
  } else {
    next();
  }
};

const validateUpdate = (req, res, next) => {
  const validationErrors = validateSchema(updateSchema, { ...req.body, id: req.params.id });

  if (validationErrors.length > 0) {
    throw Error(validationErrors);
  } else {
    next();
  }
};

module.exports = {
  validateCreate,
  validateUpdate,
};
