const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
};
