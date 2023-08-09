const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers/HttpError");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
