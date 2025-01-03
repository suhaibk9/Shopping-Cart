const CategoryService = require('./category_service');
const ProductService = require('./product_service');
const UserService = require('./user_service');

module.exports = {
  CategoryService,
  ProductService,
  UserService,
  CartService: require('./cart_service'),
  OrderService: require('./order_service'),
};
