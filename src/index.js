const express = require('express');
const { serverConfig } = require('./config');
const { NODE_ENV } = serverConfig;
const { PORT } = serverConfig;
const db = require('./config/dbConfig');

const cookieParser = require('cookie-parser');
const { DB_ALTER, DB_FORCE } = require('../src/config/serverConfig');
const bodyParser = require('body-parser');
const app = express();
const responseTime = require('response-time');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const {
  Product,
  Category,
  User,
  Cart,
  CartProducts,
  syncDbInOrder,
} = require('./models');

app.use(responseTime());

app.use('/api', require('./routes/index'));
app.listen(PORT, async () => {
  console.log(`Server for Shopcart is Up ${PORT}`);
  if (NODE_ENV == 'development') {
    if (DB_FORCE == true) {
      await db.sync({ force: true });
    } else if (DB_ALTER == true) {
      await db.sync({ alter: true });
    } else {
      await db.sync();
    }
  }
  if (NODE_ENV == 'production') {
    console.log('Syncing db in order');
    syncDbInOrder();
  }

  console.log('DB Connected');
});
