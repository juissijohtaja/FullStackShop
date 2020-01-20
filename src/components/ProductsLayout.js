import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'

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
  Form,
  Table
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import ProductCards from './ProductCards'


const ProductsLayout = (props) => {

  useEffect(() => {
    props.fetchProducts()
  }, [])

  return(
    <ResponsiveContainer>
      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '0em 0em 3em', textTransform: 'uppercase' }}
          >
            Parhaaksi arvioidut tuotteet
          </Divider>
          <ProductCards />
        </Container>
      </Segment>
      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '0em 0em 3em', textTransform: 'uppercase' }}
          >
            polkupyörät
          </Divider>
          <ProductCards category='polkupyörät' />
        </Container>
      </Segment>
      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '0em 0em 3em', textTransform: 'uppercase' }}
          >
            valokuvaus
          </Divider>
          <ProductCards category='valokuvaus' />
        </Container>
      </Segment>
      <Footer />
    </ResponsiveContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products,
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct  }
)(withRouter(ProductsLayout))