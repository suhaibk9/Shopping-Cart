const NotFoundError = require('../exceptions/not_found_error');
const { Cart, CartProducts } = require('../models/index');
const { Op } = require('sequelize');

class CartRepository {
  // get all carts
  async getCarts() {
    try {
      const response = await Cart.findAll();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // cart by user id
  async getCartByUser(userId) {
    try {
      const response = await Cart.findOne({
        where: {
          userId,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // cart by cart id
  async getCart(id) {
    try {
      const response = await Cart.findByPk(id);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // get all products in a cart
  async getCartProducts(id) {
    try {
      const response = await CartProducts.findAll({
        where: {
          cartId: id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // clear cart
  async clearCart(id) {
    try {
      const response = await CartProducts.destroy({
        where: {
          cartId: id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // create cart
  async createCart(userId) {
    try {
      console.log('Creating cart for user', userId);
      const response = await Cart.create({
        userId,
      });
      console.log('Cart created', response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // destroy cart
  async destroyCart(cartId) {
    try {
      const response = await Cart.destroy({
        where: {
          id: cartId,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // update cart
  async updateCart(cartId, productId, shouldAddProduct = true) {
    try {
      // check if the product is already in the cart
      const result = await CartProducts.findOne({
        where: {
          [Op.and]: [{ cartId: cartId }, { productId: productId }],
        },
      });
      // if shouldAddProduct is true, we want to add the product to the cart
      if (shouldAddProduct) {
        //Product not in cart
        if (!result) {
          // add product to cart with quantity 1
          await CartProducts.create({
            cartId,
            productId,
            quantity: 1,
          });
        } else {
          // increment the quantity of the product in the cart
          //increment is a sequelize method that increments the value of a column by a specified number
          await result.increment({ quantity: 1 });
        }
        // if shouldAddProduct is false, we want to remove the product from the cart
      } else {
        //Product not in cart throw error
        if (!result) {
          throw new NotFoundError('Cart Product', 'Product', productId);
        }
        // if the quantity of the product in the cart is 1, we remove the product from the cart
        if (result.quantity == 1) {
          await CartProducts.destroy({
            where: {
              [Op.and]: [{ cartId: cartId }, { productId: productId }],
            },
          });
        } else {
          // decrement the quantity of the product in the cart
          await result.increment({ quantity: -1 });
        }
      }
      // return the updated cart
      // const response = await this.getCartProducts(cartId);
      const response = await CartProducts.findAll({
        where: {
          cartId: cartId,
        },
      });
      console.log('RESPONSE: ', response);
      return {
        cartId: cartId,
        products: response,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = CartRepository;
