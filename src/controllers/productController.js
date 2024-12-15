const FakeStoreRepository = require('../repository/fake_store_repository');
const ProductService = require('../services/product_service');
const fake_store_repository = new FakeStoreRepository();
const productService = new ProductService(fake_store_repository);
const createProduct = (req, res) => {
  const product = req.body;
  const newProduct = productService.createNewProduct({
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    image: product.image,
  });
  return res.status(201).json({
    success: true,
    error: {},
    message: 'Product created successfully',
    data: newProduct,
  });
};
const getAllProducts = async (req, res) => {
  const allProducts = await productService.getEveryProduct();
  return res.status(200).json({
    success: true,
    error: {},
    message: 'Products retrieved successfully',
    data: allProducts,
  });
};
const getProduct = (req, res) => {
  const { id } = req.params;
  const product = productService.getParticularProduct(id);
  return res.status(200).json({
    success: true,
    error: {},
    message: 'Product retrieved successfully',
    data: product,
  });
};
const deleteProduct = (req, res) => {
  const { id } = req.params;
  const product = productService.removeProduct(id);
  return res.status(200).json({
    success: true,
    error: {},
    message: 'Product deleted successfully',
    data: product,
  });
};
module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
};
