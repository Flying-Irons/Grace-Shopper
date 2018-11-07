import React from 'react'
import {Link} from 'react-router-dom'

const CheckedOutPage = () => {
  console.log('hitting this page')
  return (
    <div>
      <h1>Order received-thank you for your patronage!</h1>
      <Link to="/products">
        Winter is coming! Stock up on more great products
      </Link>
    </div>
  )
}

export default CheckedOutPage
