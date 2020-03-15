import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
import { notificationSet } from '../reducers/notificationReducer'

import {
  Container,
  Header,
  Icon,
  Image,
  ListItem,
  Table,
  Message
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Link, withRouter
} from 'react-router-dom'

const Products = (props) => {

  useEffect(() => {
    props.fetchProducts()
  }, [])

  const admin = props.loggeduser.user.uid === 'GQ54E1iIjrMtX7orwFREnYHHiFD3' ? true : false

  console.log('admin', admin)

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
              <Table.Cell>
                {admin ? <Icon link name='trash alternate' color='red' onClick={() => handleRemove(product)} /> :
                  <Icon link name='trash alternate' disabled /> }
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Message
        warning
        header='Huomio!'
        content="Ainoastaan pääkäyttäjä voi poistaa tuotteita."
      />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products,
    notification: state.notification,
    loggeduser: state.loggeduser
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct, notificationSet }
)(withRouter(Products))