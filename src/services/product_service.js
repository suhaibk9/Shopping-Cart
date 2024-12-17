const InternalServerError = require('../exceptions/internal_server_error');
const NotFoundError = require('../exceptions/not_found_error');
class ProductService {
  constructor(model) {
    this.model = model;
  }

  async createNewProduct(product) {
    return await this.model.createProduct(product);
  }

  async getEveryProduct() {
    try {
      const allProducts = await this.model.getProducts();
      if (allProducts.length < 1) {
        throw new NotFoundError('Product', 'property', 'propertyValue');
      }
      return allProducts;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }

  async removeProduct(id) {
    try {
      const product = await this.model.deleteProduct(id);
      if (!pro) {
        throw new NotFoundError('Product', 'id', id);
      }
      return pro;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }

  async getParticularProduct(id) {
    try {
      const product = await this.model.getProduct(id);
      if (!product) {
        throw new NotFoundError('Product', 'id', id);
      }
      return product;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
  async destroyProduct(id) {
    try {
      const product = await this.model.deleteProduct(id);
      if (!product) {
        throw new NotFoundError('Product', 'id', id);
      }
      return product;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = ProductService;
