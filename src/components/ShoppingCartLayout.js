import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addProductToCart, increaseAmountInCart, decreaseAmountInCart, removeProductFromCart } from '../reducers/shoppingcartReducer'

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
  Table,
  Label
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'

const ShoppingCartLayout = (props) => {
  const [cartTotal, setCartTotal] = useState(0)
  useEffect(() => {
    const countCartTotal = () => {
      props.shoppingcart.map(item => {
        const productSum = item.product.price * item.amount
        cartTotalSum += productSum
      })
    }
    let cartTotalSum = 0
    countCartTotal()
    setCartTotal(cartTotalSum)
  }, [props.shoppingcart])

  const handleRemoveFromCart = (cartProduct) => {
    //e.preventDefault()
    props.removeProductFromCart(cartProduct)
  }

  const handleIncreaseAmountInCart = (cartProduct) => {
    //e.preventDefault()
    const itemToUpdate = props.shoppingcart.find(item => item.product.id === cartProduct.id)
    console.log('handleIncreaseAmountInCart', cartProduct)
    props.increaseAmountInCart(itemToUpdate)
  }

  const handleDecreaseAmountInCart = (cartProduct) => {
    //e.preventDefault()
    const itemToUpdate = props.shoppingcart.find(item => item.product.id === cartProduct.id)
    console.log('handleIncreaseAmountInCart', cartProduct)
    props.decreaseAmountInCart(itemToUpdate)
  }

  return(
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container>
          <Header as='h2' style={{ fontSize: '2em' }}>
          Ostoskori
          </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nimi</Table.HeaderCell>
                <Table.HeaderCell>Hinta</Table.HeaderCell>
                <Table.HeaderCell>Lukumäärä</Table.HeaderCell>
                <Table.HeaderCell>Välisumma</Table.HeaderCell>
                <Table.HeaderCell>Poista</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.shoppingcart.map(item =>
                <Table.Row key={item.product.name}>
                  <Table.Cell><ListItem as={Link} to={`/tuotteet/${item.product.friendlyUrl}`} >{item.product.name}</ListItem></Table.Cell>
                  <Table.Cell>{item.product.price} €</Table.Cell>
                  <Table.Cell>
                    {item.amount > 1 ? <Icon link name='minus square' color='teal' size='large' onClick={() => handleDecreaseAmountInCart(item.product)} /> : <Icon disabled name='minus square' color='teal' size='large' /> }
                    <Label basic>{item.amount}</Label>
                    <Icon link name='plus square' color='teal' size='large' onClick={() => handleIncreaseAmountInCart(item.product)} />
                  </Table.Cell>
                  <Table.Cell>{item.product.price * item.amount} €</Table.Cell>
                  <Table.Cell><Icon link name='trash alternate' color='red' onClick={() => handleRemoveFromCart(item.product)} /></Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Header as='h2' style={{ fontSize: '2em' }}>
            Kokonaissumma {cartTotal} €
          </Header>
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
    shoppingcart: state.shoppingcart
  }
}
export default connect(
  mapStateToProps, { addProductToCart, increaseAmountInCart, decreaseAmountInCart, removeProductFromCart }
)(withRouter(ShoppingCartLayout))