const ctrlWrapper = require("../../decorators/ctrlWrapper");

module.exports = {
  signup: ctrlWrapper(require("./signup")),
  signin: ctrlWrapper(require("./signin")),
  getCurrentUser: ctrlWrapper(require("./getCurrentUser")),
  signout: ctrlWrapper(require("./signout")),
  updateSubscription: ctrlWrapper(require("./updateSubscription")),
};
