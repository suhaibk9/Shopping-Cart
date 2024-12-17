const Category = require('./category');
const Product = require('./products');
// Product.belongsTo(Category, { foreignKey: 'id', as: 'category' });
// Category.hasMany(Product, {
//   foreignKey: 'id',
// });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = { Category, Product };
