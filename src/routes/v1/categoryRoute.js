const { CategoryController } = require('../../controllers');
const {
  createCategory,
  getCategories,
  deleteCategory,
  getProductsForCategory,
  getCategory,
} = CategoryController;
const {
  createCategoryValidator,
} = require('../../middlewares/category_middleware');
const router = require('express').Router();
router.post('/', createCategoryValidator, createCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);
router.get('/:id/products', getProductsForCategory);
module.exports = router;
