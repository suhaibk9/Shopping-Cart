const axios = require('axios');
class FakeStoreRepository {
  async getProducts() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');

      return response.data;
    } catch (err) {
      console.log(err);
      
    }
  }
  async getProduct(id) {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      console.log('Product', response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async createProduct(product) {
    try {
      const allProducts = await this.getProducts();
      const id = allProducts.length + 1;
      product.id = id;
        const response = await axios.post(
            'https://fakestoreapi.com/products',
            product
        );
        console.log('Product created', response.data);
        return response.data
    } catch (err) {
      console.log(err);
    }
  }
  async deleteProduct(id) {
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`
      );
      console.log('Product deleted', response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = FakeStoreRepository;
