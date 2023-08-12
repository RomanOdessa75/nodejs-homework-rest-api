const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");

const signup = async (req, res) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: "100", r: "x" }, false);
  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ ...req.body, password: hashPassword, avatarURL });
  return res.status(201).json({ email, subscription });
};

module.exports = signup;
