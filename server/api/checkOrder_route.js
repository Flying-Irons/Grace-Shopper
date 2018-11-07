const router = require('express').Router()
module.exports = router
const {CartProduct, Cart, User} = require('../db/models')


router.get('/:email/:cartId', async (req, res, next) => {
  try {
    const orderedProducts = await CartProduct.findAll({
      where: {cartId: req.params.cartId}
    })
    const cart = await Cart.findOne({
      where: {id: req.params.cartId}
    })
    const user = await User.findOne({
      where: {email: req.params.email}
    })
    if (user.id === cart.userId && cart.purchased) {
      res.send(orderedProducts)
    }
    else {
      next()
    }
  } catch(err){
    next(err)
  }
})

