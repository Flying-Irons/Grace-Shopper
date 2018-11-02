import React, {Component} from 'react'
import {getCartProductsThunk} from '../store/cart.js'
import axios from 'axios'
import SingleProduct from './SingleProduct'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const cartIdObj = await axios.get('/api/cartProducts/session')
    const cartId = cartIdObj.data.cartId
    this.props.populateCart(cartId)
  }

  render() {
    return (
      <div className="cart">
        <h2>Cart</h2>
        <div>
          {this.props.products.map(product => {
            return <SingleProduct product={product} />
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.products}
}

const mapDispatchToProps = dispatch => ({
  populateCart: cartId => dispatch(getCartProductsThunk(cartId))
})

const ConnectedCart = connect(
  mapState,
  mapDispatchToProps
)(Cart)

export default ConnectedCart
