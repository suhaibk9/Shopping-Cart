const { Product } = require('../models');
const NotFoundError = require('../exceptions/not_found_error');
class ProductRepository {
  // Create a new product
  async createProduct(product) {
    try {
      return await Product.create(product);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // Get all products
  async getProducts() {
    try {
      return await Product.findAll();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // Get a specific product by its ID
  async getProduct(id) {
    try {
      return await Product.findByPk(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // Delete a product by its ID
  async deleteProduct(id) {
    try {
      const res = await Product.destroy({ where: { id } });
      if (res === 0) {
        throw new NotFoundError('Product', 'id', id);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getProductsForCategory(categoryId) {
    try {
      return await Product.findAll({ where: { categoryId: categoryId } });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = ProductRepository;
