const Sequelize = require('sequelize');
const db = require('../config/dbConfig');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
        model: 'categories',
        key: 'id',

    }
  },
});

module.exports = Product;
