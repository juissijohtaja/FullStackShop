import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchOrders, createOrder, removeOrder } from '../reducers/orderReducer'

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
  Label,
  Checkbox
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

const Orders = (props) => {

  useEffect(() => {
    props.fetchOrders()
  }, [])

  const handleRemove = (order) => {
    //e.preventDefault()
    props.removeOrder(order)
  }

  return (
    <Segment vertical>
      <Header as='h2' style={{ fontSize: '2em' }}>
          Tilaukset
      </Header>
      {props.orders.map(order =>
        <Segment key={order.customer.name} color={order.dispatched ? 'teal' : 'orange'} padded raised style={{ marginBottom: '2em' }}>
          <Table basic='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Tila
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {order.dispatched ? 'Lähetetty' : 'Käsittelyssä'}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>
                  <Checkbox toggle checked={order.dispatched} />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Nimi
                </Table.Cell>
                <Table.Cell colSpan='2'>
                  {order.customer.name}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Osoite
                </Table.Cell>
                <Table.Cell colSpan='2'>
                  {order.customer.address}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Table basic='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Kuva</Table.HeaderCell>
                <Table.HeaderCell>Nimi</Table.HeaderCell>
                <Table.HeaderCell>Hinta</Table.HeaderCell>
                <Table.HeaderCell>Lukumäärä</Table.HeaderCell>
                <Table.HeaderCell>Yhteensä</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {order.shoppingcart.map(item =>
                <Table.Row key={item.product.name} verticalAlign='top'>
                  <Table.Cell><Image src={item.product.image} size='tiny'/></Table.Cell>
                  <Table.Cell>
                    {item.product.name}
                  </Table.Cell>
                  <Table.Cell>{item.product.price} €</Table.Cell>
                  <Table.Cell>
                    {item.amount}
                  </Table.Cell>
                  <Table.Cell>{item.product.price * item.amount} €</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Button fluid><Icon link name='trash alternate' color='red' onClick={() => handleRemove(order)} /> Poista tilaus</Button>
        </Segment>
      )}
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products,
    orders: state.orders
  }
}
export default connect(
  mapStateToProps, { fetchOrders, createOrder, removeOrder  }
)(withRouter(Orders))