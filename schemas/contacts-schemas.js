const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(5),
  favorite: Joi.boolean(),
});

const validator = (schema) => (body) => {
  return schema.validate(body);
};

const contactValidator = validator(contactSchema);

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactValidator, contactUpdateFavoriteSchema };
