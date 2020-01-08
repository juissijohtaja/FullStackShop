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

import Products from './Products'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'

const ProductsLayout = (props) => {

  useEffect(() => {
    props.fetchProducts()
  }, [])

  return(
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
          All the products you will ever need right here
          </Header>
          <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
          </p>
          <Container>
            <Header as='h2' style={{ fontSize: '2em' }}>
          Tuotteet
            </Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nimi</Table.HeaderCell>
                  <Table.HeaderCell>Kuvaus</Table.HeaderCell>
                  <Table.HeaderCell>Hinta</Table.HeaderCell>
                  <Table.HeaderCell>Kategoria</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {props.products.map(product =>
                  <Table.Row verticalAlign='top' key={product.name}>
                    <Table.Cell><ListItem as={Link} to={`/tuotteet/${product.friendlyUrl}`} >{product.name}</ListItem></Table.Cell>
                    <Table.Cell>{product.description}</Table.Cell>
                    <Table.Cell>{product.price}</Table.Cell>
                    <Table.Cell>{product.category}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Container>
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