const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers/HttpError");

const updateFavorite = async (req, res) => {
  const { error } = contactValidator(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = updateFavorite;
