const express = require('express');

const { CartController } = require('../../controllers/index');
const { isLoggedIn } = require('../../../src/middlewares/auth_middleware');

const { updateCart, getCartProducts, clearCart } = CartController;

const cartRouter = express.Router();
//This will be the route for the cart for the user with userId = id
cartRouter.patch('/:id', isLoggedIn, updateCart);
//This will be the route for the products in the cart for the user with userId = id
cartRouter.get('/:id/products', isLoggedIn, getCartProducts);
//This will be the route to clear the cart for the user with userId = id
cartRouter.delete('/:id/products', isLoggedIn, clearCart);
module.exports = cartRouter;
