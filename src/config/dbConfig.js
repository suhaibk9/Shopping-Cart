const Sequelize = require('sequelize');

const { DB_NAME, DB_USER, DB_URL, DB_PASS } = require('./serverConfig');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_URL,
  dialect: 'mysql',
});

module.exports = sequelize;
