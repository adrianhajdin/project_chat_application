const validateSchema = (schema, data) => {
  const formulatedErrors = [];
  const { error } = schema.validate(data);
  if (error) {
    error.details.map((obj) => formulatedErrors.push(obj.message));
  }
  return formulatedErrors;
};

module.exports = {
  validateSchema,
};
