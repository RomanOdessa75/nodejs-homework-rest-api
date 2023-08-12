const express = require("express");

const usersSchemas = require("../../schemas/users-schemas");

const validateBody = require("../../decorators/validateBody");

const authenticate = require("../../middlewares/authenticate");

const authRouter = express.Router();

const ctrl = require("../../controllers/auth");

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  ctrl.signup
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

module.exports = authRouter;
