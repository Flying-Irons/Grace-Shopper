import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCartIdThunk} from '../store/cart_store'

class CheckoutPage extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      FullName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getSessionCartId()
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const responseObj = await this.props.stripe.createToken({
        name: this.state.FullName,
        email: this.state.email
      })

      await axios.post('/api/carts/stripe', {
        tokenId: responseObj.token.id,
        amount: this.props.location.total
      })
      //axios.put to update cart purchased: true
      await axios.put(`/api/carts/${this.props.sessionCartId}`, {
        purchased: true
      })

      //axios.post to create new cart
      //we have current user id in state.user.id
      const newCart = await axios.post(`/api/carts/${this.props.userId}`, {
        userId: this.props.userId
      })

      //set new req.session.cartId
      const newSession = await axios.post(`/api/cartProducts/session`, {
        cartId: newCart.data.id
      })

      this.props.history.push('/checked_out_page')
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div>
        <form
          action="your-server-side-code"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <script src="https://js.stripe.com/v3/" />
          <span>Email:</span>
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <span>Full Name:</span>
          <input
            name="FullName"
            value={this.state.FullName}
            onChange={this.handleChange}
          />
          <span>Card Info:</span>

          <button
            className="button-default"
            type="submit"
            disabled={!this.state.email || !this.state.FullName ? true : false}
          >
            Submit
          </button>
        </form>
        <CardElement />
      </div>
    )
  }
}

const mapState = state => ({
  sessionCartId: state.cart.sessionCartId,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getSessionCartId: () => dispatch(getCartIdThunk())
})
const ConnectedCheckout = connect(
  mapState,
  mapDispatch
)(CheckoutPage)

export default injectStripe(ConnectedCheckout)
