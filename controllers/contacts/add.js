const Contact = require("../../models/contact");

const add = async (req, res) => {
  const { error } = contactValidator(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
};

module.exports = add;
