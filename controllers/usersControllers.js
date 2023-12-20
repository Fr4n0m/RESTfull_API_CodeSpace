const { parse } = require("dotenv");

const router = require("express").Router();

let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

const getUsers = (req, res) => {
  res.send(USERS);
};

const getUserbyId = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = USERS.find((user) => user.id === userId);
  res.send(user);
};

const patchById = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = USERS.find((user) => user.id === userId);

  if (!user) {
    res.send("El usuario no existe.");
  }

  if (name) {
    user.name = req.body.name;
  }

  if (email) {
    user.email = req.body.email;
  }

  res.send(user);
};

const addUser = (req, res) => {
  res.send(`Soy post ${JSON.stringify(req.body)}`);
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  filteredUsers = USERS.filter((user) => user.id !== userId);

  if (filteredUsers.length === USERS.length) {
    res.send("El usuario no existe.");
  } else {
    USERS = filteredUsers;
    res.send(filteredUsers);
  }
};

module.exports = { getUsers, getUserbyId, patchById, addUser, deleteUser };
