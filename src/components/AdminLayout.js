import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMessages, createMessage, removeMessage } from '../reducers/messageReducer'
import { logoutUser } from '../reducers/loginReducer'
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
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Form
} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import Products from './Products'
import ProductForm from './ProductForm'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import Orders from './Orders'


const AdminLayout = (props) => {

  const handleLogout = () => {
    props.logoutUser()
    props.notificationSet('Logout successful.', 'positive', 3)
  }

  return(
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
          Ylläpito
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Terve {props.loggeduser.username}! Hallinnoi tuotteita.
          </p>
          <p style={{ fontSize: '1.33em' }}>
            <Button color='orange' onClick={() => handleLogout()}><i aria-hidden='true' className='log out icon'></i> Kirjaudu ulos</Button>
          </p>
          <Products />
          <ProductForm />
          <Orders />
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
    loggeduser: state.loggeduser
  }
}
export default connect(
  mapStateToProps, { fetchMessages, createMessage, removeMessage, logoutUser, notificationSet }
)(withRouter(AdminLayout))