const ctrlWrapper = require("../../decorators/ctrlWrapper");

const contactController = {
  getAll: ctrlWrapper(require("./getAll")),
  getById: ctrlWrapper(require("./getById")),
  add: ctrlWrapper(require("./add")),
  deleteById: ctrlWrapper(require("./deleteById")),
  updateById: ctrlWrapper(require("./updateById")),
  updateFavorite: ctrlWrapper(require("./updateFavorite")),
};

module.exports = contactController;
