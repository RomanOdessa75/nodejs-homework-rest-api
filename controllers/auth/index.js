const ctrlWrapper = require("../../decorators/ctrlWrapper");

module.exports = {
  signup: ctrlWrapper(require("./signup")),
  // login: ctrlWrapper(require("./login")),
  // getCurrentUser: ctrlWrapper(require("./getCurrentUser")),
  // logout: ctrlWrapper(require("./logout")),
  // updateSubscription: ctrlWrapper(require("./updateSubscription")),
  // updateAvatar: ctrlWrapper(require("./updateAvatar")),
};
