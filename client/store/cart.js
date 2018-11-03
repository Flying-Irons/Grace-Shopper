import axios from 'axios'

/**
 * ACTION TYPESdkfj
 */
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const initialState = {products: [], sessionCartId: 0}

/**
 * ACTION CREATORS
 */

const getCartProducts = products => ({type: GET_CART_PRODUCTS, products})
const addToCart = product => ({type: ADD_TO_CART, product})
const updateCart = product => ({type: UPDATE_CART, product})

/*
 HELPING FUNCTIONS
 */

// const makeCartandAddProduct = async (productId, dispatch) => {
//   const newCartResponse = await axios.post('/api/carts', {}) //instantiate a new cart
//   const currentCart = newCartResponse.data

//   await axios.post('/api/cartProducts/session', {
//     cartId: currentCart.id
//   })
//   const session = await axios.get('/api/cartProducts/session')
//   // console.log('updated session unique123', session.data)
//   dispatch(getSessionCartId(session.data.cartId))
//   const newProductInCartResponse = await axios.post('/api/cartProducts', {
//     productId,
//     cartId: currentCart.id,
//     quantity: 1
//   })
//   const newProductInCart = newProductInCartResponse.data
//   const action = addToCart(newProductInCart)
//   dispatch(action)
// }

// /* -------- If the product exists, increment quantitiy. Otherwise create a new instance of product.------- */
// const justAddProductToExistingCart = async (
//   productId,
//   cart,
//   dispatch,
//   sessionCartId
// ) => {
//   //Cart is an array of product objects, so existingCartProduct.length should be either 0 or 1
//   try {
//     const existingCartProduct = cart.filter(el => {
//       return el.productId === productId
//     })

//     if (existingCartProduct.length) {
//       //If product exists, update cartProduct quantity

//       const updated = await axios.put(`/api/cartProducts/${productId}`, {
//         quantity: existingCartProduct[0].quantity + 1
//       })

//       dispatch(updateCart(updated.data))
//     } else {
//       //If product doesn't exist, make a new product to the cart
//       const newProductInCartResponse = await axios.post('/api/cartProducts', {
//         productId,
//         cartId: sessionCartId.cartId,
//         quantity: 1
//       })
//       const newProductInCart = newProductInCartResponse.data
//       const action = addToCart(newProductInCart)
//       dispatch(action)
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

/**
 * THUNK CREATORS
 */

/* --------- Populate the state with cart products on the cart page-----------*/
// export const getCartProductsThunk = cartId => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get(`/api/cartProducts/${cartId}`)
//       const action = getCartProducts(data)
//       dispatch(action)
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

/*
1) If no product.id === productId for cartId === cart.id, add a product
2) If there is a product, quantity++
*/
export const addToCartButtonThunk = product => {
  return async dispatch => {
    try {
      console.log('helo')
      const findTheCart = await axios.get('/api/cartProducts/findTheCart')
      const isThereProduct = findTheCart.data.filter(productInCart => {
        return productInCart.productId === product.id
      })

      if (!isThereProduct.length) {
        //if there isn't, add product
        const newProductInCartResponse = await axios.post('/api/cartProducts', {
          productId: product.id,
          cartId: `doesn't matter`,
          quantity: 1
        })
        // dispatch(newProductInCartResponse)
      } else {
        const updated = await axios.put(`/api/cartProducts/${product.id}`, {
          quantity: isThereProduct[0].quantity + 1
        })
        // dispatch(updateCart(updated.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

// export const addToCartButtonThunk = (productId, cart, user) => {
//   console.log('cartProducts araray', cart)
//   return async dispatch => {
//     try {
//       //if the user exists, bring out the cart. otherwise make the cart.
//       const doesUserExist = 'hi'

//       if (!sessionCartId.cartId) {
//         makeCartandAddProduct(productId, dispatch)
//       } else {
//         dispatch(getSessionCartId(sessionCartId.cartId))
//         justAddProductToExistingCart(productId, cart, dispatch, sessionCartId)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

/**
 * REDUCER
 */

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return {...state, products: action.products}
    // return [...state, action.products]
    // case ADD_TO_CART:
    //   return {...state, products: [...state.products, action.product]}
    //   return [...state, action.product]
    case UPDATE_CART:
      const copy = [
        ...state.products.filter(el => {
          return el.productId !== action.product.productId
        }),
        action.product
      ]
      return {...state, products: copy}

    // case GET_SESSION_CART_ID:
    //   return {...state, sessionCartId: action.cartId}
    default:
      return state
  }
}

export default CartReducer
