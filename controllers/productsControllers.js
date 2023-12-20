const productModel = require("../Models/productModels");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const data = await productModel.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, size, colors, brand } = req.body;
    const newProduct = new productModel({
      name,
      price,
      description,
      size,
      colors,
      brand,
    });

    await newProduct.save();
    res.status(201).json({ status: "succeeded", newProduct, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    res.status(200).json({ status: "succeeded", product, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const patchById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, description, size, colors, brand } = req.body;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send("El producto no existe");
    }

    if (name) {
      product.name = req.body.name;
    }
    if (price) {
      product.price = req.body.price;
    }
    if (description) {
      product.description = req.body.description;
    }
    if (size) {
      product.size = req.body.size;
    }
    if (colors) {
      product.colors = req.body.colors;
    }
    if (brand) {
      product.brand = req.body.brand;
    }

    await product.save(); //? Guarda los cambios en la bd
    res.status(200).json({ status: "succeeded", product, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: "No se proporcionó el ID del producto." });
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      throw new Error("ID de producto no válido proporcionado.");
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const deletedProduct = await productModel.findOneAndDelete({
      _id: objectId,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "No se encontró el producto." });
    }

    return res
      .status(200)
      .json({ message: `Producto con id: { ${id} } eliminado con éxito.` });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  patchById,
  deleteProduct,
};
