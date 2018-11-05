const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const product = await Product.findAll()
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
//123

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    if (newProduct) res.status(201).send(newProduct)
  } catch (err) {
    next(err)
  }
})
