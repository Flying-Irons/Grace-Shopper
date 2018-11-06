import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import ProductList from './components/ProductList'
import SingleProduct from './components/SingleProduct'
import AddProduct from './components/addProduct'
import Cart from './components/Cart'
import Checkout from './components/checkout'
import CheckedOutPage from './components/CheckedOut'
import {StripeProvider, Elements} from 'react-stripe-elements'

/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={ProductList} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/checked_out_page" component={CheckedOutPage} />
        <StripeProvider apiKey="pk_test_5B0zuPIGjKtZN850A2UUx5Xt">
          <Elements>
            <Route path="/checkout" component={Checkout} />
          </Elements>
        </StripeProvider>
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={ProductList} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
