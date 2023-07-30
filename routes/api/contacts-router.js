const express = require("express");

const router = express.Router();

const contactController = require("../../controllers/contacts-controllers");

const isEmptyBody = require("../../middlewares/isEmptyBody");

router.get("/", contactController.getAll);

router.get("/:contactId", contactController.getById);

router.post("/", isEmptyBody, contactController.add);

router.delete("/:contactId", contactController.deleteById);

router.put("/:contactId", isEmptyBody, contactController.updateById);

module.exports = router;
