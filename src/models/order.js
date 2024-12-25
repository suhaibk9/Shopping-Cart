const Sequelize = require('sequelize');
const db = require('../config/dbConfig');
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'completed', 'cancelled'],
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

module.exports = Order;
