import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
import { notificationSet } from '../reducers/notificationReducer'

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

const Products = (props) => {

  useEffect(() => {
    props.fetchProducts()
  }, [])

  const handleRemove = (product) => {
    //e.preventDefault()
    props.removeProduct(product)
    props.notificationSet('Product removed.', 'positive', 3)
  }

  return (
    <Container>
      <Header as='h2' style={{ fontSize: '2em' }}>
          Tuotteet
      </Header>
      <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kuva</Table.HeaderCell>
            <Table.HeaderCell>Nimi</Table.HeaderCell>
            <Table.HeaderCell>Kuvaus</Table.HeaderCell>
            <Table.HeaderCell>Hinta</Table.HeaderCell>
            <Table.HeaderCell>Kategoria</Table.HeaderCell>
            <Table.HeaderCell>Poista</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.products.map(product =>
            <Table.Row verticalAlign='top' key={product.name}>
              <Table.Cell><Image src={product.image} size='tiny'/></Table.Cell>
              <Table.Cell><ListItem as={Link} to={`/tuotteet/${product.friendlyUrl}`} >{product.name}</ListItem></Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell><Icon link name='trash alternate' color='red' onClick={() => handleRemove(product)} /></Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products,
    notification: state.notification
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct, notificationSet }
)(withRouter(Products))