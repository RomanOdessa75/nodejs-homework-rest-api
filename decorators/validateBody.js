const { HttpError } = require("../helpers/HttpError");

const validateBody = (schema) => {
  const validate = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    next();
  };

  return validate;
};

module.exports = validateBody;
