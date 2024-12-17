const Category = require('../models/category');
class CategoryRepository {
  async createCategory(category) {
    try {
      return await Category.create(category);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getCategories() {
    try {
      return await Category.findAll();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getCategory(id) {
    try {
      return await Category.findByPk(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async deleteCategory(id) {
    try {
      return await Category.destroy({ where: { id } });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = CategoryRepository;
