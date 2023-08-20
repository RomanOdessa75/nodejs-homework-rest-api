const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HttpError } = require("../../helpers/HttpError");

const User = require("../../models/user");
const dotenv = require("dotenv");

dotenv.config();

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, "password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "100d" });
  //   console.log(token);
  await User.findByIdAndUpdate(user._id, { token });
  // return res.json({ token });
  res.json({ token });
};

module.exports = signin;
