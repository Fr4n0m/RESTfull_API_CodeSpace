const userModel = require("../Models/userModels");
const mongoose = require("mongoose");
const emailService = require("../services/emailServices");

const getUsers = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getUserbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.status(200).json({ status: "succeeded", user, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const patchById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send("El usuario no existe");
    }

    if (name) {
      user.name = req.body.name;
    }

    if (email) {
      user.email = req.body.email;
    }

    await user.save(); //? Guarda los cambios en la bd
    res.status(200).json({ status: "succeeded", user, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = new userModel({
      name,
      email,
    });

    await newUser.save();
    const subject = `Gracias por registrarte ${name}`;
    const html = `<h1>Disfruta de nuestra plataforma!</h1>`;
    await emailService.sendEmail(email, subject, html);
    res.status(201).json({ status: "succeeded", newUser, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ message: "No se proporcionó el ID del usuario." });
  }

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      throw new Error("ID de usuario no válido proporcionado.");
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const deletedUser = await userModel.findOneAndDelete({ _id: objectId });

    if (!deletedUser) {
      return res.status(404).json({ message: "No se encontró el usuario." });
    }

    return res
      .status(200)
      .json({ message: `Usuario con id: { ${id} } eliminado con éxito.` });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const countUsers = async (req, res) => {
  try {
    const usersCount = await userModel.countDocuments();
    res.status(200).send({ total: usersCount });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const users = userModel.find(
      { email: { $regex: /@/ } },
      { name: 1, _id: 0 }
    );
    res.status(200).json({ status: "succeeded", users, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserbyId,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  getUserByEmail,
};
