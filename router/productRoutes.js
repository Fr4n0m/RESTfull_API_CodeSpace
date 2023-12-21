const {
  getProducts,
  addProduct,
  getProductById,
  patchById,
  deleteProduct,
  getPriceAvg,
  getSizesByProductId,
  deleteProductItem,
} = require("../controllers/productsControllers");

const router = require("express").Router();

router.get("/", getProducts);
router.get("/average", getPriceAvg);
router.get("/size/:id", getSizesByProductId);

router.get("/:id", getProductById);
router.patch("/:id", patchById);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", deleteProductItem);

module.exports = router;
