const { UserRepository, CartRepository } = require('../repository');
const { UserService, CartService } = require('../services');
const cartRepo = new CartRepository();
const userRepo = new UserRepository();
const userService = new UserService(userRepo, cartRepo);
const NotFoundError = require('../exceptions/not_found_error');
const errorResponse = require('../utils/error_response');
const { serverConfig } = require('../config/index');
const { NODE_ENV } = serverConfig;
const { ReasonPhrases } = require('http-status-codes');
const UnauthorizedError = require('../exceptions/unauthorized_error');
const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await userService.createUser({
      email: user.email,
      password: user.password,
    });
    return res.status(201).json({
      success: true,
      error: {},
      message: 'User created successfully',
      data: newUser,
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'BadRequestError') {
      return res.status(400).json(errorResponse(ReasonPhrases.BAD_REQUEST, e));
    } else {
      return res
        .status(500)
        .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getUsers();
    if (allUsers.length < 1) {
      return res.status(200).json({
        success: true,
        error: {},
        message: 'No users found',
        data: allUsers,
      });
    }
    return res.status(200).json({
      success: true,
      error: {},
      message: 'Users retrieved successfully',
      data: allUsers,
    });
  } catch (e) {
    console.log(e);
    if (e instanceof NotFoundError)
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    else
      return res
        .status(500)
        .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUser(userId);
    return res.status(200).json({
      success: true,
      error: {},
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (e) {
    console.log(e);
    if (e instanceof NotFoundError)
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    else
      return res
        .status(500)
        .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userService.deleteUser(userId);
    return res.status(200).json({
      success: true,
      error: {},
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (e) {
    console.log(e);
    if (e instanceof NotFoundError)
      return res.status(404).json(errorResponse(ReasonPhrases.NOT_FOUND, e));
    else
      return res
        .status(500)
        .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, e));
  }
};

const signInUser = async (req, res) => {
  try {
    const response = await userService.signInUser(
      req.body.email,
      req.body.password
    );
    res.cookie(
      'token', //cookie name
      response, //jwt token
      {
        httpOnly: true, // Prevents JavaScript from accessing the cookie
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: NODE_ENV === 'production' ? true : false, // cookie sent only over https
      }
    );
    if (response) {
      return res.status(200).json({
        success: true,
        error: {},
        message: 'User signed in successfully',
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: {},
        message: 'Invalid password',
      });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof NotFoundError) {
      return res
        .status(404)
        .json(errorResponse(ReasonPhrases.NOT_FOUND, error));
    } else if (error.name === 'UnauthorizedError') {
      return res
        .status(401)
        .json(errorResponse(ReasonPhrases.UNAUTHORIZED, error));
    } else {
      return res
        .status(500)
        .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, error));
    }
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  signInUser,
  deleteUser,
};
