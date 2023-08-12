const ctrlWrapper = require("../../decorators/ctrlWrapper");

const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = ctrlWrapper(getCurrentUser);
