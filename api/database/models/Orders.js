const Sequelize = require('sequelize')
const db = require('../config')
const User = require('./User')
const Product = require('./Product')


const Model = Sequelize.Model;

const Orders = db.define('orders',{
  count: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  db,
  modelName: 'orders'
});
User.hasMany(Orders)
Product.hasMany(Orders)
module.exports = Orders;
