const router = require('express').Router();
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct
} = require('../../controllers/productController');
const {
  createProductValidator,
} = require('../../middlewares/product_middlewares');
router.post('/', createProductValidator, createProduct);
router.get('/:id', getProduct);
router.get('/', getAllProducts);
router.delete('/:id', deleteProduct);
module.exports = router;
