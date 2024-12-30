const Category = require('./category');
const Product = require('./products');
const User = require('./user');
const Cart = require('./cart');
const CartProducts = require('./cart_products');
const OrderProducts = require('./order_products');
const Order = require('./order');

Product.belongsTo(Category, { foreignKey: 'categoryId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });

// One to one mapping of users and cart
// Cart belongs to one user
// User has one cart
User.hasOne(Cart);
//Cart belongs to user
Cart.belongsTo(User, { foreignKey: 'userId' });

// Many to Many mapping between cart and products
// Cart has many products through cart_products
// Product belongs to many cart through cart_product
Cart.belongsToMany(Product, { through: CartProducts });
Product.belongsToMany(Cart, { through: CartProducts });

// One to many mapping between user and orders
//One User can have many orders and one order belongs to one user
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
// Many to many mapping between order and products
// Order has many products through order_products
// Product belongs to many orders through order_products
Order.belongsToMany(Product, { through: OrderProducts });
Product.belongsToMany(Order, { through: OrderProducts });

async function syncDbInOrder() {
  await Category.sync();
  await Product.sync();
  await User.sync();
  await Cart.sync();
  await Order.sync();
  await CartProducts.sync();
  await OrderProducts.sync();
}
module.exports = {
  Category,
  Product,
  User,
  Cart,
  CartProducts,
  OrderProducts,
  Order,
  syncDbInOrder,
};
