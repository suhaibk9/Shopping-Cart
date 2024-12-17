const router = require('express').Router();
const { ProductController } = require('../../controllers');
const { createProduct, getAllProducts, deleteProduct, getProduct } =
  ProductController;
const {
  createProductValidator,
} = require('../../middlewares/product_middlewares');
router.post('/', createProductValidator, createProduct);
router.get('/:id', getProduct);
router.get('/', getAllProducts);
router.delete('/:id', deleteProduct);
module.exports = router;
