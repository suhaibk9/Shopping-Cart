const db = require('../config/dbConfig');
const { Sequelize } = require('sequelize');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;
