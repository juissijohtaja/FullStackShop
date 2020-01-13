import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchOrders, createOrder, removeOrder, toggleOrderStatus } from '../reducers/orderReducer'
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

  const handleStatusToggle = (order) => {
    console.log('handleStatusToggle')
    props.toggleOrderStatus(order)
    props.notificationSet('Status updated.', 'positive', 3)
  }

  return (
    <Segment vertical>
      <Header as='h2' size='large'>
          Tilaukset
      </Header>
      {props.orders.map(order =>
        <Segment key={order.id} padded style={{ margin: '3em 0 4em' }}>
          <Table size='large' color={order.dispatched ? 'teal' : 'orange'} >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>
                  Tila
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {order.dispatched ? 'Lähetetty' : 'Käsittelyssä'}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>
                  <Checkbox toggle checked={order.dispatched} onClick={() => handleStatusToggle(order)} />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>

          <Header>Yhteystiedot</Header>
          <Table basic>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={2}>
                  Nimi
                </Table.Cell>
                <Table.Cell>
                  {order.customer.name}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Osoite
                </Table.Cell>
                <Table.Cell>
                  {order.customer.address}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Header>Tuotteet</Header>

          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>Kuva</Table.HeaderCell>
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
              <Table.Row>
                <Table.Cell colSpan='3' />
                <Table.Cell>
                  <Header as='h4'>Kokonaissumma</Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as='h4'>{order.cartTotal} €</Header>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button className={order.dispatched ? '' : 'disabled'} onClick={() => handleRemove(order)} basic size='tiny' color='grey'><Icon link name='trash alternate' />Poista tilaus</Button>
          {order.dispatched ? <Label color='teal' tag>Tilauksen voi poistaa</Label> : <Label color='orange' tag>Lähetä tilaus ennen poistamista</Label>}
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
  mapStateToProps, { fetchOrders, createOrder, removeOrder, toggleOrderStatus, notificationSet  }
)(withRouter(Orders))