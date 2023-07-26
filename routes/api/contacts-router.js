const express = require("express");

const router = express.Router();

const contactController = require("../../controllers/contacts-controllers");

router.get("/", contactController.getAll);

router.get("/:contactId", contactController.getById);

router.post("/", contactController.add);

router.delete("/:contactId", contactController.deleteById);

router.put("/:contactId", contactController.updateById);

module.exports = router;
