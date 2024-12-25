const Sequelize = require('sequelize');
const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/serverConfig');
const User = db.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      len: [3, 20],
      isAlphanumeric: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        //salt -> random string that is used to hash the password
        const salt = await bcrypt.genSaltSync(SALT_ROUNDS);
        user.password = await bcrypt.hashSync(user.password, salt);
      },
    },
  }
);
module.exports = User;
