const {
  getUsers,
  getUserbyId,
  patchById,
  deleteUser,
  addUser,
  countUsers,
  getUserByEmail,
} = require("../controllers/usersControllers");

const router = require("express").Router();

router.get("/", getUsers);

router.get("/count", countUsers);
router.get("/search", getUserByEmail);

router.get("/:id", getUserbyId);
router.patch("/:id", patchById);
router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;
