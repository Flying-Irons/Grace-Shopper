import React from 'react'
import {Link} from 'react-router-dom'

const CheckedOutPage = () => {
  return (
    <div>
      <h1>Order recieved-thank you for your patronage!</h1>
      <Link to="/products">
        Winter is coming! Stock up on more great products
      </Link>
    </div>
  )
}

export default CheckedOutPage
