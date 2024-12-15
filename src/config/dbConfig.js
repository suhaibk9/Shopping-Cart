const Sequelize = require('sequelize');

const { DB_NAME, DB_USER, DB_URL } = require('./serverConfig');

const sequelize = new Sequelize(DB_NAME, DB_USER, '', {
  host: DB_URL,
  dialect: 'mysql',
});

module.exports = sequelize;
