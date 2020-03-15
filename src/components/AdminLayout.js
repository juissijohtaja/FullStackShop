/* eslint-disable react/display-name */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { notificationSet } from '../reducers/notificationReducer'

import {
  Button,
  Container,
  Header,
  Segment,
  Tab
} from 'semantic-ui-react'

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom'

import Products from './Products'
import ProductForm from './ProductForm'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import Orders from './Orders'


const AdminLayout = (props) => {

  useEffect(() => {
    props.notificationSet('Welcome!', 'positive', 3)
  }, [])

  const handleLogout = () => {
    props.logoutUser()
    props.notificationSet('Logout successful.', 'positive', 3)
  }

  const panes = [
    { menuItem: { key: 'tuotteet', icon: 'camera', content: 'Tuotteet' }, render: () => <Tab.Pane><Products /></Tab.Pane>  },
    { menuItem: { key: 'lisaatuote', icon: 'plus square', content: 'Lisää tuote' }, render: () => <Tab.Pane><ProductForm /></Tab.Pane> },
    { menuItem: { key: 'tilaukset', icon: 'cube', content: 'Tilaukset' }, render: () => <Tab.Pane><Orders /></Tab.Pane> },
  ]

  return(
    <ResponsiveContainer>
      <Segment>
        <Container>
          <Header as='h3' style={{ fontSize: '2em' }}>
          Ylläpito
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Terve {props.loggeduser.user.email}! Hallinnoi tuotteita.
          </p>
          <p style={{ fontSize: '1.33em' }}>
            <Button color='orange' onClick={() => handleLogout()}><i aria-hidden='true' className='log out icon'></i> Kirjaudu ulos</Button>
          </p>
          <Tab panes={panes} />
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
  mapStateToProps, { logoutUser, notificationSet }
)(withRouter(AdminLayout))