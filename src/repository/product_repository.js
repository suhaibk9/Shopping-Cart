const { Product } = require('../models');
const NotFoundError = require('../exceptions/not_found_error');
const { Op } = require('sequelize');
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
  //filter -> {limit, offset, minPrice, maxPrice}
  async getProducts(filter) {
    try {
      if (JSON.stringify(filter) !== '{}') {
        const { limit, offset, min_price, max_price } = filter;
        const where = {};
        if (min_price !== undefined) {
          where.price = { ...where.price, [Op.gte]: Number(min_price) };
        }
        if (max_price !== undefined) {
          where.price = { ...where.price, [Op.lte]: Number(max_price) };
        }
        const queryOptions = { where };
        if (limit !== undefined) queryOptions.limit = Number(limit);
        if (offset !== undefined) queryOptions.offset = Number(offset);
        console.log('Query Options', queryOptions);
        return await Product.findAll(queryOptions);
      } else {
        return await Product.findAll();
      }
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
