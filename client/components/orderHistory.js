import React from 'react'
import axios from 'axios'
import {checkOrderThunk, emptyCartProducts} from '../store/cart_store'
import {getProductsThunk} from '../store/products_store'
import { connect } from 'react-redux';

class OrderHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      cartId: 0,
      purchasedCart: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getAllProducts()
    this.props.emptyCartProducts()
  }
  
  handleSubmit(event) {
    event.preventDefault()
    this.props.checkOrder(this.state.email, this.state.cartId)
    this.checkCartOnState()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.props.products)
    // this.props.products.length ? this.checkCartOnState() : null
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <span>Email:</span>
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <span>Order Confirmation Number</span>
          <input
            name='cartId'
            value={this.state.cartId}
            onChange={this.handleChange}
          />
          <button 
            type="submit"
            disabled={
              !this.state.email ||
              !this.state.cartId
                ? true
                : false
            }
            >
              Submit
            </button>
        </form>
        {true ? 
        //filter down our all products array
          this.props.allProducts
            .filter(
              wholeProductObj => this.props.products
                .map(product => product.productId)
                .includes(wholeProductObj.id)
          )
            .map(filteredProduct => 
              //table of products
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
                </td>
              </tr>
            )
          : 
        null}
      </div>

    )
  }
}

const mapState = state => ({
  products: state.cart.products,
  allProducts: state.products
})
const mapDispatch = dispatch => ({
  checkOrder: (email, cartId) => dispatch(checkOrderThunk(email, cartId)), 
  getAllProducts: () => dispatch(getProductsThunk()),
  emptyCartProducts: () => dispatch(emptyCartProducts())
})

export default connect(mapState, mapDispatch)(OrderHistory)