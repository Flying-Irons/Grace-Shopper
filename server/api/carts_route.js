const router = require('express').Router()
// const { models } = require('sequelize') 
module.exports = router
const {Cart, CartProduct} = require('../db/models')
const stripe = require('stripe')('sk_test_lwbYoF0OG9a1rULY519kOozL')

router.get('/', async (req, res, next) => {
  try {
    const allCarts = await Cart.findAll()
    res.status(200).send(allCarts)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create()
    res.status(201).send(newCart)
  } catch (err) {
    next(err)
  }
})

router.post('/stripe', async (req, res, next) => {
  try {
    console.log(req.body.tokenId)
    let {status} = await stripe.charges.create({
      amount: 4000,
      currency: 'usd',
      source: req.body.tokenId
    })

    console.log(status)
    res.json({status})
  } catch (err) {
    next(err)
  }
})
