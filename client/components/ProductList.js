import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'
import {addToCartButtonThunk, getCartProductsThunk} from '../store/cart'
import axios from 'axios'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.displayAllProducts()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({state: 're-rendered'})
  }

  render() {
    // console.log('cartproducts in state', this.props.cartProducts)
    // console.log('this.props.sessioncartid', this.props.sessionCartId)
    return (
      <div className="product-list">
        {this.props.products.map(product => {
          return (
            <div className="product-block" key={product.id}>
              <Link to={'/products/' + product.id} key={product.id}>
                <div>
                  <h2>{product.name}</h2>
                </div>
                <div>
                  <h3> Price: ${product.price} </h3>
                </div>
                <div>
                  <img className="product-img" src={product.imageUrl} />
                </div>
              </Link>
              <form
                onSubmit={this.handleSubmit}
                onClick={() => {
                  console.log('state on click', this.props)
                  this.props.addCartButton(product)
                }}
              >
                <button type="submit">Add to cart</button>
              </form>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.all,
    cartProducts: state.cart.products,
    user: state.user
  }
}
/*plan to add products to cart:
1) click button
2) use req.session.cart.id to find which cart
3) put product into said cart
*/
const mapDispatchToProps = dispatch => ({
  displayAllProducts: () => dispatch(getAllProductsThunk()),
  addCartButton: product => {
    dispatch(addToCartButtonThunk(product))
  }
  // getCartProducts: cartId => dispatch(getCartProductsThunk(cartId))
})

const ConnectedProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)

export default ConnectedProductList
