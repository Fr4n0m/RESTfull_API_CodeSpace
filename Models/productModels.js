const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sizes = ["S", "L", "M", "L", "XL"];

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: sizes,
  },
  colors: {
    type: [String],
  },
  brand: {
    type: String,
  },
});

const product = mongoose.model("Product", productSchema, "Product");

module.exports = product;
