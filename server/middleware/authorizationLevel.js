const requireAuthorization = (req, res, next, method, check) => {
  switch (method) {
    case 'post product':
      if (req.session.isAdmin !== true) {
        res.send(401, 'Unauthorized')
      } else {
        next()
      }
    case 'cartId':
      console.log('hello', check, req.session.cartId)
      if (req.session.cartId !== check) {
        console.log('why are we in here????????')
        res.send(401, 'Unauthorized')
      }
    default:
      console.log('authorized')
  }
}

module.exports = requireAuthorization
