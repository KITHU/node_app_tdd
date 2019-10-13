const Sequelize = require('sequelize')

const db = new Sequelize('postgresql://postgres:password@localhost:5432/product');
db.sync();
module.exports = db