const Sequelize = require('sequelize')
const db = require('../config')


const Model = Sequelize.Model;

const Product = db.define('product',{
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  db,
  modelName: 'product'
});

module.exports = Product;
