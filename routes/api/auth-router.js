const express = require("express");

const usersSchemas = require("../../schemas/users-schemas");

const validateBody = require("../../decorators/validateBody");

const { authenticate, upload } = require("../../middlewares/index");

const authRouter = express.Router();

const ctrl = require("../../controllers/auth");

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  ctrl.signup
);

authRouter.get("/verify/:verificationToken", ctrl.verifyEmail);

authRouter.post(
  "/verify",
  validateBody(usersSchemas.userEmailSchema),
  ctrl.resendVerifyEmail
);

authRouter.post(
  "/signin",
  validateBody(usersSchemas.userSigninSchema),
  ctrl.signin
);

authRouter.get("/current", authenticate, ctrl.getCurrentUser);

authRouter.post("/signout", authenticate, ctrl.signout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(usersSchemas.userUpdateSubscriptionSchema),
  ctrl.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.addAvatars
);

module.exports = authRouter;
