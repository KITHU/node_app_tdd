const Sequelize = require('sequelize')
const dotenv = require('dotenv') 
dotenv.config();

let dburl = process.env.DB_DEV || process.env.DB_TEST

const db = new Sequelize(dburl);
db.sync();
module.exports = db