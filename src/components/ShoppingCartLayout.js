import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addProductToCart, increaseAmountInCart, decreaseAmountInCart, removeProductFromCart, removeAllProductsFromCart } from '../reducers/shoppingcartReducer'
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

  const handleSendOrder = () => {
    //e.preventDefault()
    props.removeAllProductsFromCart()
    props.notificationSet('Tilaus lähetetty.', 'positive', 3)
  }

  return(
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '0em 0em 3em', textTransform: 'uppercase' }}
          >
            Ostoskori
          </Divider>
          {props.shoppingcart.length === 0 ?
            <Container>
              <Segment placeholder textAlign='center'>
                <Header><Icon name='bullhorn' />Ostoskorissasi ei ole tuotteita.</Header>
              </Segment>
              <Button fluid size='big' color='teal' as={NavLink} to='/tuotteet'>Jatka shoppailua</Button>
            </Container>
            :
            <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='2'>Tuote</Table.HeaderCell>
                  <Table.HeaderCell>Hinta</Table.HeaderCell>
                  <Table.HeaderCell>Lukumäärä</Table.HeaderCell>
                  <Table.HeaderCell>Yhteensä</Table.HeaderCell>
                  <Table.HeaderCell>Poista</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {props.shoppingcart.map(item =>
                  <Table.Row key={item.product.name} verticalAlign='top'>
                    <Table.Cell><Image src={item.product.image} size='small'/></Table.Cell>
                    <Table.Cell>
                      <ListItem as={Link} to={`/tuotteet/${item.product.friendlyUrl}`} >{item.product.name}</ListItem>
                    </Table.Cell>
                    <Table.Cell>{item.product.price} €</Table.Cell>
                    <Table.Cell>
                      {item.amount > 1 ? <Icon link name='minus square' color='teal' size='large' onClick={() => handleDecreaseAmountInCart(item.product)} /> : <Icon disabled name='minus square' color='teal' size='large' /> }
                      <Label basic>{item.amount}</Label>
                      <Icon link name='plus square' color='teal' size='large' onClick={() => handleIncreaseAmountInCart(item.product)} />
                    </Table.Cell>
                    <Table.Cell>{item.product.price * item.amount} €</Table.Cell>
                    <Table.Cell><Icon link name='trash alternate' color='grey' onClick={() => handleRemoveFromCart(item.product)} /></Table.Cell>
                  </Table.Row>
                )}
                <Table.Row>
                  <Table.Cell colSpan='3' />
                  <Table.Cell>
                    <Header as='h4'>Kokonaissumma</Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Header as='h4'>{cartTotal} €</Header>
                  </Table.Cell>
                  <Table.Cell />
                </Table.Row>
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.Cell colSpan='6' >
                    <Button fluid size='big' color='teal' onClick={() => handleSendOrder()}>Lähetä tilaus</Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Footer>
            </Table>
          }
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
    shoppingcart: state.shoppingcart,
    notification: state.notification
  }
}
export default connect(
  mapStateToProps, { addProductToCart, increaseAmountInCart, decreaseAmountInCart, removeProductFromCart, removeAllProductsFromCart, notificationSet }
)(withRouter(ShoppingCartLayout))