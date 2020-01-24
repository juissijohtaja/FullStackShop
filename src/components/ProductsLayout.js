import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'

import {
  Container,
  Divider,
  Segment
} from 'semantic-ui-react'

import {
  BrowserRouter as Router, withRouter
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
          <ProductCards category={props.category} />
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