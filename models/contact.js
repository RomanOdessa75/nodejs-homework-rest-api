const { Schema, model } = require("mongoose");
const { handleSaveError, handleUpdateValidate } = require("../models/hooks");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      validate: [
        {
          validator: function (v) {
            return patterns.namePattern.test(v);
          },
          message: (props) =>
            `${props.value} is not invalid name. It must be letters only`,
        },
        {
          validator: (v) => v.length >= 2,
          message: (props) =>
            `Name must be at least 2 characters. Got ${props.value.length}`,
        },
        {
          validator: (v) => v.length <= 30,
          message: (props) =>
            `Name must be less then 30 characters. Got ${props.value.length}`,
        },
      ],
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      unique: true,
      validate: [
        {
          validator: function (v) {
            return patterns.phonePattern.test(v);
          },
          message: "Invalid phone number. It should be (XXX) XXX-XXXX",
        },
      ],
      required: [true, "Phone is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre("findOneAndUpdate", handleUpdateValidate);

contactSchema.post("save", handleSaveError);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
