const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const CategoryRepository = require('../repository/category_repository');
const CategoryService = require('../services/category_service');
const errorResponse = require('../utils/error_response');
const categoryRepository = new CategoryRepository();
const NotFoundError = require('../exceptions/not_found_error');
const categoryService = new CategoryService(categoryRepository);
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
module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
};
