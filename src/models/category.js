const db = require('../config/dbConfig');
const { Sequelize } = require('sequelize');
const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;
