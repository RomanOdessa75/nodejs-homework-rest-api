const { isValidObjectId } = require("mongoose");

const { httpError } = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(httpError(404, `${contactId} is not valid ID`));
  }
  next();
};

module.exports = isValidId;
