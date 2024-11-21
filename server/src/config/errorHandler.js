// handle global error in the server
module.exports = (err, req, res, next) => {
  console.log(err);
  let response = { message: "", errors: [], statusCode: 500 };

  if (
    err instanceof ReferenceError ||
    err instanceof RangeError ||
    err instanceof SyntaxError ||
    err instanceof TypeError ||
    err instanceof URIError
  ) {
    response = {
      message: "something went wrong",

      statusCode: 500,
    };
  } else {
    response = {
      message: err.message,
      statusCode: 400,
    };
  }

  return res.status(response.statusCode).json({ ...response, statusCode: undefined });
};
