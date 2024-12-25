const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { CartService } = require('../services/index');
const { CartRepository } = require('../repository/index');
const errorResponse = require('../utils/error_response');
const cartRepo = new CartRepository();
const cartService = new CartService(cartRepo);
async function updateCart(req, res) {
  console.log('I am in controller');
  try {
    const shouldAddProduct =
      req.body.shouldAddProduct == true || req.body.shouldAddProduct == 'true'
        ? true
        : false;

    const response = await cartService.updateCart(
      req.user.id,
      req.params.id,
      req.body.productId,
      shouldAddProduct
      //   req.body.shouldAddProduct
    );
    console.log('RESPONSE IN CONTROLLER: ', response);
    return res.status(StatusCodes.OK).json({
      success: true,
      error: {},
      message: 'Updated Cart successfully',
      data: response,
    });
  } catch (error) {
    console.log('CartController: Something went wrong', error);
    return res
      .status(error.statusCode)
      .json(errorResponse(error.reason, error));
  }
}

async function getCartProducts(req, res) {
  try {
    console.log('req.params.id', req.params.id);
    console.log('req.user', req.user);
    const response = await cartService.getCartProducts(
      req.params.id,
      req.user.id
    );

    return res.status(StatusCodes.OK).json({
      sucess: true,
      error: {},
      message: 'Updated Cart successfully',
      data: response,
    });
  } catch (error) {
    console.log('CartController: Something went wrong', error);
    return res
      .status(error.statusCode)
      .json(errorResponse(error.reason, error));
  }
}

async function clearCart(req, res) {
  try {
    const response = await cartService.clearCart(req.params.id, req.user.id);

    return res.status(StatusCodes.OK).json({
      sucess: true,
      error: {},
      message: 'Updated Cart successfully',
      data: response,
    });
  } catch (error) {
    console.log('CartController: Something went wrong', error);
    return res
      .status(error.statusCode)
      .json(errorResponse(error.reason, error));
  }
}

module.exports = {
  updateCart,
  getCartProducts,
  clearCart,
};
