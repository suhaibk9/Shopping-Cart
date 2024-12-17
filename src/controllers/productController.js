const { ProductRepository } = require('../repository');
const { ProductService } = require('../services');
const productService = new ProductService(new ProductRepository());
const NotFoundError = require('../exceptions/not_found_error');
const errorResponse = require('../utils/error_response');
const { ReasonPhrases } = require('http-status-codes');
const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = await productService.createNewProduct({
    title: product.title,
    description: product.description,
    categoryId: product.categoryId,
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
  try {
    const allProducts = await productService.getEveryProduct();
    return res.status(200).json({
      success: true,
      error: {},
      message: 'Products retrieved successfully',
      data: allProducts,
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'NotFoundError')
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    else
      return res
        .status(500)
        .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getParticularProduct(id);
    return res.status(200).json({
      success: true,
      error: {},
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'NotFoundError')
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    else
      return res
        .status(500)
        .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.destroyProduct(id);
    return res.status(200).json({
      success: true,
      error: {},
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    console.log(error);
    if (error.name === 'NotFoundError')
      return res
        .status(404)
        .json(errorResponse(ReasonPhrases.NOT_FOUND, error));
    else
      return res
        .status(500)
        .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, error));
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
};
