const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = favorite ? { owner, favorite } : { owner };

  const contacts = await Contact.find({ filter }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  console.log("GET /", contacts);
  res.status(200).json(contacts);
};

module.exports = getAll;
