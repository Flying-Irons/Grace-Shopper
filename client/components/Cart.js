/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartProductsThunk,
  getCartIdThunk,
  removeItemThunk,
  decrementQuantityThunk,
  incrementQuantityThunk
} from '../store/cart_store'
import {Link} from 'react-router-dom'

import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
    this.calculateQuantity = this.calculateQuantity.bind(this)
    // this.getCartId = this.getCartId.bind(this)
    // this.getProductInfo = this.getProductInfo.bind(this)
    // this.populatesState = this.populatesState.bind(this)
  }

  componentDidMount() {
    // this.props.getSession() // state.cart.sessionCartId exists
    console.log('thispropscartId at time of mount', this.props.cartId)
    this.props.cartId > 0 && this.props.populateCart(this.props.cartId) //now state.cart.products is correct.

    this.calculateQuantity()
  }

  calculateQuantity() {
    const total = this.props.products.reduce((acc, current) => {
      return (
        acc +
        this.props.allProducts.filter(
          product => product.id === current.productId
        )[0].price *
          current.quantity
      )
    }, 0)
    this.setState({total})
  }

  render() {
    if (!this.props.products.length) {
      return (
        <div className="cart">
          <h2>Your cart is empty!</h2>
          <Link to="/products">Start Shopping</Link>
        </div>
      )
    } else {
      return (
        <div className="cart">
          <h2>Cart</h2>
          <table>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity:</th>
            </tr>
            {this.props.allProducts
              .filter(allProduct => {
                return this.props.products
                  .map(product => product.productId)
                  .includes(allProduct.id)
              })
              .map(filteredProduct => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr>
                    <td>{filteredProduct.name}</td>
                    <td>{filteredProduct.price}</td>
                    <td>
                      <form>
                        <label>
                          <input
                            type="text"
                            value={
                              this.props.products.filter(
                                product =>
                                  product.productId === filteredProduct.id
                              )[0].quantity
                            }
                          />
                        </label>
                      </form>
                      <button
                        onClick={() =>
                          this.props.incrementQuantity(
                            filteredProduct.id,
                            this.props.cartId
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          this.props.decrementQuantity(
                            filteredProduct.id,
                            this.props.cartId
                          )
                        }
                      >
                        -
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          this.props.removeItem(filteredProduct.id)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
          </table>
          <div>
            Total:
            {this.state.total}
          </div>
          <button>
            <Link to={{pathname: '/checkout', total: this.state.total}}>
              Checkout
            </Link>
          </button>
        </div>
      )
    }
  }
}

const mapState = state => ({
  cartId: state.cart.sessionCartId,
  products: state.cart.products,
  allProducts: state.products
})

const mapDispatch = dispatch => ({
  populateCart: cartId => dispatch(getCartProductsThunk(cartId)),

  getSession: () => dispatch(getCartIdThunk()),

  removeItem: id => dispatch(removeItemThunk(id)),

  incrementQuantity: (productId, cartId) =>
    dispatch(incrementQuantityThunk(productId, cartId)),

  decrementQuantity: (productId, cartId) =>
    dispatch(decrementQuantityThunk(productId, cartId))
})

const connectedCart = connect(
  mapState,
  mapDispatch
)(Cart)

export default connectedCart
