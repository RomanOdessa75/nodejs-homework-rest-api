const express = require("express");

const usersSchemas = require("../../schemas/users-schemas");

const validateBody = require("../../decorators/validateBody");

const authRouter = express.Router();

const ctrl = require("../../controllers/auth");

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  ctrl.signup
);

module.exports = authRouter;
