import React from 'react'
import {
  Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'

import './App.css'
import HomepageLayout from './components/HomepageLayout'
import ProductsLayout from './components/ProductsLayout'
import ProductPageLayout from './components/ProductPageLayout'
import MessagesLayout from './components/MessagesLayout'
import MessagePageLayout from './components/MessagePageLayout'
import ShoppingCartLayout from './components/ShoppingCartLayout'
import LoginPageLayout from './components/LoginPageLayout'
import AdminLayout from './components/AdminLayout'

import { fetchMessages } from './reducers/messageReducer'

const App = (props) => {

  return (
    <Router>
      <Route exact path="/" render={() =>
        <HomepageLayout />
      } />
      <Route exact path="/tuotteet" render={() =>
        <ProductsLayout />
      } />
      <Route exact path="/valokuvaus" render={() =>
        <ProductsLayout category='valokuvaus' />
      } />
      <Route exact path="/polkupyorat" render={() =>
        <ProductsLayout category='polkupyörät' />
      } />
      <Route exact path="/hifi" render={() =>
        <ProductsLayout category='hifi' />
      } />
      <Route path="/tuotteet/:id" render={() =>
        <ProductPageLayout />
      } />
      <Route exact path="/viestit" render={() =>
        <MessagesLayout />
      } />
      <Route path="/viestit/:id" render={() =>
        <MessagePageLayout />
      } />
      <Route path="/ostoskori" render={() =>
        <ShoppingCartLayout />
      } />
      <Route path="/kirjaudu" render={() =>
        props.loggeduser.username ? <Redirect to="/yllapito" /> : <LoginPageLayout />
      } />
      <Route path="/yllapito" render={() =>
        props.loggeduser.username ? <AdminLayout /> : <Redirect to="/kirjaudu" />
      } />
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    router: state.router,
    shoppingcart: state.shoppingcart,
    loggeduser: state.loggeduser
  }
}
export default connect(
  mapStateToProps, { fetchMessages }
)(App)


