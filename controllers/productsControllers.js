const productModel = require("../Models/productModels");
const mongoose = require("mongoose");
const emailService = require("../services/emailServices");

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    await emailService.sendEmail();
    res.status(200).json({ status: "succeeded", products, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", products: null, error: error.message });
  }
};

const getPriceAvg = async (req, res) => {
  let query = {};
  if (req.query.category) {
    query["category"] = req.query.category;
  }
  try {
    const priceAvgData = await productModel.aggregate([
      { $match: query },
      { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
    ]);
    res.status(200).json({
      status: "succeeded",
      message: `Average Price of Products in ${query._id} Category`,
      data: priceAvgData[0] ? priceAvgData[0].avgPrice : null,
      error: null,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "Failed",
      message: `Error occured while getting average price for category - ${query._id}`,
      data: null,
      error: err,
    });
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

const getSizesByProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId, "sizes"); //? Para seleccionar solo el campo sizes

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }

    const sizes = product.sizes;
    res.status(200).json({
      status: "Success",
      message: "Tallas del producto obtenidas con éxito",
      sizes: sizes,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudieron obtener las tallas del producto seleccionado",
      error: error.message,
    });
  }
};

const deleteColorByProductId = async (req, res) => {
  try {
    const { id, color } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "El producto no tiene colores asociados.",
      });
    }

    const colors = product.colors;
    const indexOfColor = product.colors.indexOf(color);

    if (indexOfColor === -1) {
      return res.status(404).json({
        message: "El color no existe en este producto.",
      });
    }

    product.colors.slice(indexOfColor, 1);
    await product.save();

    res.status(200).json({
      message: "Se ha eliminado correctamente el color del producto.",
      data: product.colors,
    });
  } catch (error) {
    res.status(400).json({
      message: "Ocurrió un error al intentar eliminar el color del producto.",
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  patchById,
  deleteProduct,
  getPriceAvg,
  getSizesByProductId,
  deleteColorByProductId,
};
