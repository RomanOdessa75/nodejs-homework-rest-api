const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers/HttpError");

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
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    // runValidators: true
  });
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.status(200).json(contact);
};

module.exports = updateById;
