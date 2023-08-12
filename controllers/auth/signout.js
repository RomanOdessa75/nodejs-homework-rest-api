const { User } = require("../../models/user");
const ctrlWrapper = require("../../decorators/ctrlWrapper");

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No content" });
};

module.exports = ctrlWrapper(signout);
