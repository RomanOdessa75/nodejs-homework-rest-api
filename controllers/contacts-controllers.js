// const Contact = require("../models/contact");

// const { contactValidator } = require("../schemas/contacts-schemas");

// const { HttpError } = require("../helpers/HttpError");

// const ctrlWrapper = require("../decorators/ctrlWrapper");

// const getAll = async (req, res) => {
//   const contacts = await Contact.find();
//   console.log("GET /", contacts);
//   res.status(200).json(contacts);
// };

// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await Contact.findById(contactId);
//   if (!contact) {
//     throw HttpError(404, `Not found`);
//   }
//   res.status(200).json(contact);
// };

// const add = async (req, res) => {
//   const { error } = contactValidator(req.body);
//   if (error) {
//     throw HttpError(400, "missing required name field");
//   }
//   const contact = await Contact.create(req.body);
//   res.status(201).json(contact);
// };

// const deleteById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await Contact.findByIdAndDelete(contactId);
//   if (!contact) {
//     throw HttpError(404, `Not found`);
//   }
//   res.status(200).json({ message: "contact deleted" });
// };

// const updateById = async (req, res) => {
//   const { error } = contactValidator(req.body);
//   if (error) {
//     throw HttpError(400, "missing fields");
//   }
//   const { name, email, phone } = req.body;
//   const { contactId } = req.params;
//   if (!name && !email && !phone) {
//     res.status(400).json({ message: "missing fields" });
//   }
//   const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//     // runValidators: true
//   });
//   if (!contact) {
//     throw HttpError(404, `Contact with id=${contactId} is not found`);
//   }
//   res.status(200).json(contact);
// };

// const updateFavorite = async (req, res) => {
//   const { error } = contactValidator(req.body);
//   if (error) {
//     throw HttpError(400, "missing fields");
//   }
//   const { name, email, phone } = req.body;
//   const { contactId } = req.params;
//   if (!name && !email && !phone) {
//     res.status(400).json({ message: "missing field favorite" });
//   }
//   const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!contact) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(contact);
// };

// const contactController = {
//   getAll: ctrlWrapper(getAll),
//   getById: ctrlWrapper(getById),
//   add: ctrlWrapper(add),
//   deleteById: ctrlWrapper(deleteById),
//   updateById: ctrlWrapper(updateById),
//   updateFavorite: ctrlWrapper(updateFavorite),
// };

// module.exports = contactController;
