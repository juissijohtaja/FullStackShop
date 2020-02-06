/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
import { addProductToCart, increaseAmountInCart } from '../reducers/shoppingcartReducer'
import { notificationSet } from '../reducers/notificationReducer'

import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Modal
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import ImageModal from './ImageModal'

import Stars from './Stars'


const ProductageLayout = (props) => {
  useEffect(() => {
    props.fetchProducts()
  }, [])

  console.log('ProductageLayout props', props)

  const productContent = props.products.find(product => product.friendlyUrl === props.match.params.id)

  const addToBasket = () => {
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



  const ProductSegment = () => {
    return (
      <Segment style={{ padding: '4em 0em' }} vertical>
        <Grid container stackable verticalAlign='top'>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image bordered rounded size='large' src={productContent.image} />
              <ImageModal imageSource={productContent.image} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                {productContent.name}
              </Header>
              <Stars amount={productContent.rating} />
              <Header as='h4' style={{ fontSize: '2em' }}>
                {productContent.price} €
              </Header>
              <Button fluid size='big' icon='shopping basket' content='Lisää ostoskoriin' color='teal' onClick={() => addToBasket()} style={{ marginBottom: '2em' }} />
              <p style={{ fontSize: '1.33em' }}>
                {productContent.description}
              </p>
              <p style={{ fontSize: '1.33em' }}>
              <Icon name='tag' color='grey' /> <Link to={`/${productContent.category}`}>{productContent.category}</Link>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }

  const ProductSpinner = () => {
    return (
      <Segment loading style={{ padding: '12em 0em' }} vertical />
    )
  }

  return(
    <ResponsiveContainer>
      {productContent? <ProductSegment /> : <ProductSpinner />}
      <Footer />
    </ResponsiveContainer>
  )
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
)(withRouter(ProductageLayout))