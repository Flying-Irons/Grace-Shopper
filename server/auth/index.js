const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
const CartProducts = require('../db/models/cartProducts')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const activeUserCart = await Cart.findOne({
        where: {
          userId: user.id
        }
      })
      // const ourCart = allCarts.filter(cart => cart.userId === user.id)
      if (!activeUserCart) {
        await Cart.create({userId: user.id})
      } else {
        //since there's already a cart, dispatch to session
        // req.session.cartId = user.cartId not working yet, plan is:
        // const cart = await Cart.findOne({
        //   where: {userId: user.id, purchased: false}
        // })
        const activeUsersProducts = await CartProducts.findAll({
          where: {cartId: activeUserCart.id}
        })
        res.send(activeUsersProducts)
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  console.log('came from get request', req.session)
  res.json(req.user)
})

router.use('/google', require('./google'))

//when i log in, i want to see their cartId
