const express = require('express');
const { serverConfig } = require('./config');
const { PORT } = serverConfig;
const db = require('./config/dbConfig');
const Category = require('../src/models/category');
const bodyParser = require('body-parser');
const app = express();
const responseTime = require('response-time');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(responseTime());
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.use('/api', require('./routes/index'));
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await db.sync();
  console.log('Database is connected');
  const res=await Category.create({
    name: 'Electronics',
    description: 'Electronic Items',
  });
  console.log(res);
});
