const Sequelize = require('sequelize');
const db = require('../config/dbConfig');
const Order_Product = db.define('order_product', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id',
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports=Order_Product;