const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const { contactValidator } = require("../utils/validators/validator");

const { HttpError } = require("../helpers/HttpError");

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    console.log("GET /", contacts);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
