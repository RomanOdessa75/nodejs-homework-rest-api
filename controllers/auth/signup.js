const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");

// const signup = async (req, res) => {
//   const newUser = await User.create(req.body);
//   res.status(201).json({
//     email: newUser.email,
//     password: newUser.password,
//   });
// };

const signup = async (req, res) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: "100", r: "x" }, false);
  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ ...req.body, password: hashPassword, avatarURL });
  //   return res.status(201).json({ email, subscription });
  res.status(201).json({
    password: user.password,
    email: user.email,
  });
};

module.exports = signup;
