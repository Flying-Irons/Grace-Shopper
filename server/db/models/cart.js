const Sequelize = require('sequelize')
const db = require('../db')
//add test
const Cart = db.define('cart', {
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
  // isDefault:{
  //   type: Sequelize.BOOLEAN,
  //   devfaultvalue: false,
  //   allowNull: false
  // }
})

module.exports = Cart
