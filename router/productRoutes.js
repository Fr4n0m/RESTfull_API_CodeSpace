const {
  getProducts,
  addProduct,
  getProductById,
  patchById,
  deleteProduct,
} = require("../controllers/productsControllers");

const router = require("express").Router();

router.get("/", getProducts);

router.get("/:id", getProductById);
router.patch("/:id", patchById);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
