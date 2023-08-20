const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");
const sendEmail = require("../../helpers/sendEmail");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmailMsg = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">verify email</a>`,
    // html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">verify email</a>`,
  };

  await sendEmail(verifyEmailMsg);

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
