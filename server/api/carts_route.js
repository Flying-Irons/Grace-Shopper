const router = require('express').Router()
// const { models } = require('sequelize')
module.exports = router
const {Cart, CartProduct} = require('../db/models')
const stripe = require('stripe')('sk_test_lwbYoF0OG9a1rULY519kOozL')
const authorization = require('../middleware/authorizationLevel')

router.get('/', async (req, res, next) => {
  try {
    const allCarts = await Cart.findAll()
    res.status(200).send(allCarts)
  } catch (err) {
    next(err)
  }
})

router.get('/:cartId', authorization, async (req, res, next) => {
  try {
    console.log('went into the route page of carts')
    authorization(req, res, next, 'cartId', req.params.cartId)
    const singleCart = await Cart.findById(req.params.cartId)
    res.status(200).send(singleCart)
  } catch (err) {
    console.log(err)
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

router.post('/:userId', async (req, res, next) => {
  try {
    console.log('post being hit')
    const newCart = await Cart.create({userId: req.body.userId})
    res.status(201).send(newCart)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const toBeUpdatedCart = await Cart.findOne({
      where: {id: req.params.id}
    })
    const updatedCart = await toBeUpdatedCart.update({
      purchased: req.body.purchased || toBeUpdatedCart.purchased,
      userId: req.body.userId || toBeUpdatedCart.userId
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
router.post('/stripe', async (req, res, next) => {
  try {
    console.log(req.body)
    let {status} = await stripe.charges.create({
      amount: req.body.amount * 100,
      currency: 'usd',
      source: req.body.tokenId
    })

    console.log(status)
    res.json({status})
  } catch (err) {
    next(err)
  }
})
