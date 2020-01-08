/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
import { addProductToCart, increaseAmountInCart } from '../reducers/shoppingcartReducer'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  ListItem,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Form
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'

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
        console.log('Product added to cart')
        props.addProductToCart({ product: productContent, amount: 1 })
    } else {
        props.increaseAmountInCart(itemToUpdate)
        console.log('Product already in cart')
    }
  }

  const ProductSegment = () => {
    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='top'>
          <Grid.Row>
          <Grid.Column width={6}>
              <Image bordered rounded size='large' src='https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                {productContent.name}
              </Header>
              <Header as='h3' style={{ fontSize: '2em' }}>
                {productContent.price} €
              </Header>
              <Button icon='shopping basket' content='Lisää ostoskoriin' color='teal' onClick={() => addToBasket()} style={{ marginBottom: '2em' }} />
              <p style={{ fontSize: '1.33em' }}>
                {productContent.description}
              </p>
              <p style={{ fontSize: '1.33em' }}>
                {productContent.category}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }

  const ProductSpinner = () => {
    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            <i aria-hidden="true" className='circle notch loading icon'></i>
          </Header>
        </Container>
      </Segment>
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
    shoppingcart: state.shoppingcart
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct, addProductToCart, increaseAmountInCart }
)(withRouter(ProductageLayout))