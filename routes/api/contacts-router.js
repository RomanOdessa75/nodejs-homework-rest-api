const express = require("express");

const router = express.Router();

const contactController = require("../../controllers/contacts-controllers");

const validateBody = require("../../decorators/validateBody");

const {
  contactValidator,
  contactUpdateFavoriteSchema,
} = require("../../schemas/contacts-schemas");

const isEmptyBody = require("../../middlewares/isEmptyBody");

const isValidId = require("../../middlewares/isValidId");

router.get("/", contactController.getAll);

router.get("/:contactId", isValidId, contactController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactValidator),
  contactController.add
);

router.delete("/:contactId", isValidId, contactController.deleteById);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactValidator),
  contactController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  contactController.updateFavorite
);

module.exports = router;
