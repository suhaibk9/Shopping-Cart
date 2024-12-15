class ProductService {
  constructor(model) {
    this.model = model;
  }

  async createNewProduct(product) {
   
    return await this.model.createProduct(product);
  }

  async getEveryProduct() {
    return await this.model.getProducts();
  }

  removeProduct(id) {
    return this.model.deleteProduct(id);
  }

  getParticularProduct(id) {
    return this.model.getProduct(id);
  }
}

module.exports = ProductService;
