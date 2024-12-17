const {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
} = require('../../controllers/category_controller');
const {
  createCategoryValidator,
} = require('../../middlewares/category_middleware');
const router = require('express').Router();
router.post('/', createCategoryValidator, createCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);
module.exports = router;
