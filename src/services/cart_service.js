const InternalServerError = require('../exceptions/internal_server_error');
const NotFoundError = require('../exceptions/not_found_error');
const UnauthorizedError = require('../exceptions/unauthorized_error');
class CartService {
  constructor(repository) {
    this.repository = repository;
  }

  async updateCart(userId, cartId, productId, shouldAddProduct = true) {
    try {
      const cart = await this.repository.getCart(cartId);
      if (!cart) {
        throw new NotFoundError('Cart', 'id', cartId);
      }
      console.log('USER ID: ', userId);
      console.log('CART USER ID: ', cart.userId);
      if (cart.userId !== userId) {
        throw new UnauthorizedError(
          'You are not authorized to do the current operation'
        );
      }
      console.log('CREATEING CART SERVICE');
      const response = await this.repository.updateCart(
        cartId,
        productId,
        shouldAddProduct
      );
      console.log('RESPONSE: ', response);
      return response;
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError
      ) {
        throw error;
      }

      console.log('CartService: ', error);
      throw new InternalServerError();
    }
  }

  async getCartProducts(cartId, userId) {
    try {
      const cart = await this.repository.getCart(cartId);
      if (!cart) {
        throw new NotFoundError('Cart', 'id', cartId);
      }
      if (cart.userId !== userId) {
        throw new UnauthorizedError(
          'You are not authorised to do the current operation'
        );
      }
      const response = await this.repository.getCartProducts(cartId);
      return response;
    } catch (error) {
      if (
        error.name === 'NotFoundError' ||
        error.name === 'UnauthorizedError'
      ) {
        throw error;
      }
      console.log('CartService: ', error);
      throw new InternalServerError();
    }
  }

  async clearCart(cartId, userId) {
    try {
      const cart = await this.repository.getCart(cartId);
      if (!cart) {
        throw new NotFoundError('Cart', 'id', cartId);
      }
      if (cart.userId !== userId) {
        throw new UnauthorizedError(
          'You are not authorised to do the current operation'
        );
      }
      const response = await this.repository.clearCart(cartId);
      return response;
    } catch (error) {
      if (
        error.name === 'NotFoundError' ||
        error.name === 'UnauthorizedError'
      ) {
        throw error;
      }
      console.log('CartService: ', error);
      throw new InternalServerError();
    }
  }
}

module.exports = CartService;
