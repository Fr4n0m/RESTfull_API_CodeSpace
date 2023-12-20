const {
  getUsers,
  getUserbyId,
  patchById,
  deleteUser,
  addUser,
} = require("../controllers/usersControllers");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getUserbyId);
router.patch("/:id", patchById);
router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;
