const Sequelize = require('sequelize')
const db = require('../config')


const Model = Sequelize.Model;

const User = db.define('user',{
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  db,
  modelName: 'user'
});

module.exports = User;
