import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom'

import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
import { addProductToCart, increaseAmountInCart } from '../reducers/shoppingcartReducer'
import { notificationSet } from '../reducers/notificationReducer'

// NOT IN USE
const AddToBasket = (props) => {

  const productContent = props.product

  //e.preventDefault()
  const itemToUpdate = props.shoppingcart.find(item => item.product.id === productContent.id)
  if (!itemToUpdate) {
    console.log('Tuote lisätty ostoskoriin')
    props.addProductToCart({ product: productContent, amount: 1 })
  } else {
    props.increaseAmountInCart(itemToUpdate)
    console.log('Tuotteen määrää ostoskorissa lisätty.')
  }
  props.notificationSet('Tuote lisätty ostoskoriin.', 'positive', 3)
}


const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products,
    shoppingcart: state.shoppingcart,
    notification: state.notification
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct, addProductToCart, increaseAmountInCart, notificationSet }
)(withRouter(AddToBasket))