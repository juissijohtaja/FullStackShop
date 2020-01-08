
const shoppingcartReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  const stateCopy = [...state]
  switch(action.type) {
  case 'ADD_PRODUCT_TO_CART':
    return [...state, action.data]
  case 'REMOVE_PRODUCT_FROM_CART':
    return stateCopy.filter(item => item.product.id !== action.data.id)
  case 'UPDATE_CART':
    return stateCopy.map(item => item.product.id === action.data.product.id ? action.data : item)
  default:
    return state
  }
}

export const addProductToCart = (cartProduct) => {
  console.log('addProductToCart', cartProduct)
  const item = { product: cartProduct.product, amount: cartProduct.amount }
  /* window.localStorage.setItem(
    'oldSchoolShoppingCart', JSON.stringify(cartProduct)
  ) */
  return async dispatch => {
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      data: item
    })
  }
}

export const removeProductFromCart = (cartProduct) => {
  console.log('removeProductFromCart', cartProduct)
  return async dispatch => {
    dispatch({
      type: 'REMOVE_PRODUCT_FROM_CART',
      data: cartProduct
    })
  }
}

export const increaseAmountInCart = (cartProduct) => {
  console.log('increaseAmountInCart cartProduct.amount before', cartProduct.amount)
  cartProduct.amount += 1
  console.log('increaseAmountInCart cartProduct.amount after', cartProduct.amount)
  return async dispatch => {
    dispatch({
      type: 'UPDATE_CART',
      data: cartProduct
    })
  }
}

export const decreaseAmountInCart = (cartProduct) => {
  console.log('decreaseAmountInCart cartProduct.amount before', cartProduct.amount)
  if (cartProduct.amount > 1) {
    cartProduct.amount -= 1
  }
  console.log('decreaseAmountInCart cartProduct.amount after', cartProduct.amount)
  return async dispatch => {
    dispatch({
      type: 'UPDATE_CART',
      data: cartProduct
    })
  }
}

export default shoppingcartReducer