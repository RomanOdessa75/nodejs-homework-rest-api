const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const { contactValidator } = require("../schemas/movies-schemas");

const { HttpError } = require("../helpers/HttpError");

const { ctrlWrapper } = require("../decorators/ctrlWrapper");

const getAll = async (req, res) => {
  const contacts = await listContacts();
  console.log("GET /", contacts);
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { error } = contactValidator(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { error } = contactValidator(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
  }
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.status(200).json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
