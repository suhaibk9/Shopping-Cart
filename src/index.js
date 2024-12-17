const express = require('express');
const { serverConfig } = require('./config');
const { PORT } = serverConfig;
const db = require('./config/dbConfig');
const { DB_ALTER, DB_FORCE } = require('../src/config/serverConfig');
const bodyParser = require('body-parser');
const app = express();
const responseTime = require('response-time');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { Product, Category } = require('./models');
app.use(responseTime());

app.use('/api', require('./routes/index'));
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  if (DB_FORCE) {
    await db.sync({ force: true });
  } else if (DB_ALTER) {
    await db.sync({ alter: true });
  } else {
    await db.sync();
  }
  // await db.sync({ force: false });
  // const res = await Product.create({
  //   title: 'iPhone 14',
  //   description: 'The latest iPhone',
  //   price: 100,
  //   image: 'iphone14.jpg',
  //   categoryId: 1,
  // });
  const category = await Category.findByPk(1);
  if (category) {
    const products = await category.getProducts();
    console.log(products);
  }
  console.log('Database is connected');
});
