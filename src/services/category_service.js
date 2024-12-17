const InternalServerError = require('../exceptions/internal_server_error');
const NotFoundError = require('../exceptions/not_found_error');
// const errorMessage = `The resource: ${resourceName} with ${property} : ${propertyValue} not found!`
class CategoryService {
  constructor(categoryRepository, productRepository) {
    this.categoryRepository = categoryRepository;
    this.productRepository = productRepository;
  }
  async getProductsForCategory(id) {
    try {
      const resp = await this.categoryRepository.getCategory(id);
      if (!resp) {
        throw new NotFoundError('Category', 'id', id);
      }
      const products = await this.productRepository.getProductsForCategory(id);
      if (products.length < 1) {
        throw new NotFoundError('Product', 'category_id', id);
      }
      return products;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
  async createCategory(category) {
    try {
      return await this.categoryRepository.createCategory(category);
    } catch (e) {
      console.log(e);
      throw new InternalServerError();
    }
  }
  async getCategories() {
    try {
      const allCategories = await this.categoryRepository.getCategories();

      if (allCategories.length < 1) {
        throw new NotFoundError('Category', 'property', 'propertyValue');
      }
      return allCategories;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
  async getCategory(id) {
    try {
      const cat = await this.categoryRepository.getCategory(id);
      if (!cat) {
        throw new NotFoundError('Category', 'id', id);
      }
      return cat;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
  async deleteCategory(id) {
    try {
      const cat = await this.categoryRepository.deleteCategory(id);
      if (!cat) {
        throw new NotFoundError('Category', 'id', id);
      }
      return cat;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
}

module.exports = CategoryService;
