const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  console.log("GET /", contacts);
  res.status(200).json(contacts);
};

module.exports = getAll;
