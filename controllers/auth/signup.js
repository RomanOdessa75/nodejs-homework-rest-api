const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");
const sendEmail = require("../../helpers/sendEmail");
const { nanoid } = require("nanoid");

const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = process.env;

const signup = async (req, res) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: "100", r: "x" }, false);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmailMsg = {
    to: email,
    subject: "Verify email",
    // html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">verify email</a>`,
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">verify email</a>`,
  };

  await sendEmail(verifyEmailMsg);

  return res.status(201).json({ email, subscription });
};

// console.log(process.env.BASE_URL);

module.exports = signup;
