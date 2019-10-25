const Sequelize = require('sequelize')

let db_production = 'postgresql://pharel:pharel@localhost:5432/product'

let db_test = 'postgresql://pharel:pharel@localhost:5432/db_test'


const db = new Sequelize(db_test);
db.sync();
module.exports = db