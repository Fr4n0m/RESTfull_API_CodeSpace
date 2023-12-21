const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "El valor no puede ser menor que 0"],
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    enum: ["S", "L", "M", "L", "XL"],
    default: ["S", "L", "M", "L", "XL"],
  },
  colors: {
    type: [String],
    required: true,
    validate: [arrayMinLength, "Debe de tener un color mínimo"],
  },
  brand: {
    type: String,
    required: true,
  },
});

function arrayMinLength(arr) {
  return arr.length >= 1;
}

const product = mongoose.model("Product", productSchema, "Product");

module.exports = product;
