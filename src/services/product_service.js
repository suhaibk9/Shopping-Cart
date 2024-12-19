const InternalServerError = require('../exceptions/internal_server_error');
const NotFoundError = require('../exceptions/not_found_error');
const BadRequestError = require('../exceptions/bad_request_error');
class ProductService {
  constructor(model) {
    this.model = model;
  }

  async createNewProduct(product) {
    return await this.model.createProduct(product);
  }

  async getEveryProduct(query) {
    let allProducts;
    try {
      if (JSON.stringify(query) !== '{}') {
        let filter = {};
        if (query.limit) filter.limit = Number(query.limit);
        if (query.offset) filter.offset = Number(query.offset);
        filter.min_price = query.min_price
          ? Number(query.min_price)
          : Number.MIN_SAFE_INTEGER;
        filter.max_price = query.max_price
          ? Number(query.max_price)
          : Number.MAX_SAFE_INTEGER;
        if (query.limit !== undefined && isNaN(filter.limit))
          throw new BadRequestError(
            'Limit',
            'limit',
            'Limit should be a number'
          );
        else if (query.offset !== undefined && isNaN(filter.offset))
          throw new BadRequestError(
            'Offset',
            'offset',
            'Offset should be a number'
          );
        else if (query.min_price !== undefined && isNaN(filter.min_price))
          throw new BadRequestError(
            'Min Price',
            'min_price',
            'Min Price should be a number'
          );
        else if (query.max_price !== undefined && isNaN(filter.max_price))
          throw new BadRequestError(
            'Max Price',
            'max_price',
            'Max Price should be a number'
          );
        console.log('Filter', filter);
        allProducts = await this.model.getProducts(filter);
      } else {
        allProducts = await this.model.getProducts({});
      }
      if (allProducts.length < 1) {
        return [];
      }
      return allProducts;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      if (e instanceof BadRequestError) {
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
