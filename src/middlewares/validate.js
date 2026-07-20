const { ZodError } = require("zod");
const ApiError = require("../utils/ApiError");

const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new ApiError(
            400,
            error.issues.map((err) => err.message).join(", ")
          )
        );
      }

      next(error);
    }
  };
};

module.exports = validate;