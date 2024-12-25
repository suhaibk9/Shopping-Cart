const express = require('express');
const { serverConfig } = require('./config');
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
const { Product, Category, User, Cart, CartProducts } = require('./models');
app.use(responseTime());

app.use('/api', require('./routes/index'));
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await db.sync();
  /*
  if (DB_FORCE) {
    //It means that the database will be recreated every time the server is started.
    await db.sync({ force: true });
  } else if (DB_ALTER) {
    //It means that the database will be updated every time the server is started.
    await db.sync({ alter: true });
  } else {
    //It means that the database will be connected every time the server is started
    await db.sync();
  }*/
  // await db.sync({ force: false });
  // const res = await Product.create({
  //   title: 'iPhone 14',
  //   description: 'The latest iPhone',
  //   price: 100,
  //   image: 'iphone14.jpg',
  //   categoryId: 1,
  // });
  // const category = await Category.findByPk(1);
  // if (category) {
  //   const products = await category.getProducts();
  //   console.log(products);
  // }
  console.log('Database is connected');
  // const user = await User.findByPk(13);
  // const cart = await user.getCart();
  // console.log(cart);
});

/**
 HTTP Only Cookie
An HTTP-only cookie is a small piece of data stored on your browser that a website can use to remember you. The key feature is that it’s only accessible by the server, not by JavaScript running on the page. This helps protect the cookie from certain types of attacks and makes your browsing more secure.
Even though the cookie is stored on your browser, the HTTP-only flag is set by the server to prevent client-side scripts, like JavaScript, from accessing it. This is a security measure to protect sensitive information from being stolen by malicious scripts, adding an extra layer of security to your browsing experience.
Here’s an example of an HTTP-only cookie:
Set-Cookie: session=abc123; HttpOnly
This cookie is named session and has the value abc123. The HttpOnly flag is set, which means that JavaScript running on the page cannot access the cookie. This is important for security reasons because it prevents malicious scripts from reading the cookie and stealing sensitive information.
 */
