const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers/HttpError");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(contact);
};

module.exports = getById;
