const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"], //! regex para la validacion del correo.
  },
});

const user = mongoose.model("User", userSchema, "User");

module.exports = user;
