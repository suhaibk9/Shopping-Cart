const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const { ProductRepository, CategoryRepository } = require('../repository');
const { CategoryService } = require('../services');
const categoryRepository = new CategoryRepository();
const productRepository = new ProductRepository();
const NotFoundError = require('../exceptions/not_found_error');
const errorResponse = require('../utils/error_response');
const categoryService = new CategoryService(
  categoryRepository,
  productRepository
);
const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const newCategory = await categoryService.createCategory({
      name: category.name,
      description: category.description,
    });
    return res.status(201).json({
      success: true,
      error: {},
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};
const getCategories = async (req, res) => {
  try {
    const allCategories = await categoryService.getCategories();
    return res.status(200).json({
      success: true,
      error: {},
      message: 'Categories retrieved successfully',
      data: allCategories,
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'NotFoundError')
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategory(id);
    return res.status(200).json({
      success: true,
      error: {},
      message: 'Category retrieved successfully',
      data: category,
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'NotFoundError')
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    return res
      .status(500)
      .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.deleteCategory(id);
    return res.status(200).json({
      success: true,
      error: {},
      message: 'Category deleted successfully',
      data: category,
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'NotFoundError')
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    return res
      .status(500)
      .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};
const getProductsForCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await categoryService.getProductsForCategory(id);
    return res.status(200).json({
      success: true,
      error: {},
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'NotFoundError')
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    return res
      .status(500)
      .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};
module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  getProductsForCategory,
};
