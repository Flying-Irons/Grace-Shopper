import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'
import axios from 'axios'

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
      console.log(responseObj.token.id)
      await axios.post('/api/carts/stripe', {tokenId: responseObj.token.id})
    } catch(err) {
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
        <script src="https://js.stripe.com/v3/"></script>
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
            disabled={
              !this.state.email ||
              !this.state.FullName
                ? true
                : false
            }
          >
            Submit
          </button>
        </form>
        <CardElement />
      </div>
    )
  }
}

export default injectStripe(CheckoutPage)
