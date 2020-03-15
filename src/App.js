import React from 'react'
import { connect } from 'react-redux'
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

import SignUpPageLayoutFb from './components/SignUpPageLayoutFb'


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
      <Route exact path="/polkupyörät" render={() =>
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
        props.loggeduser.user ? <Redirect to="/yllapito" /> : <LoginPageLayout />
      } />
      <Route path="/yllapito" render={() =>
        props.loggeduser.user ? <AdminLayout /> : <Redirect to="/kirjaudu" />
      } />

      <Route path="/rekisteroidy" render={() =>
        <SignUpPageLayoutFb />
      } />
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    router: state.router,
    shoppingcart: state.shoppingcart,
    loggeduser: state.loggeduser
  }
}
export default connect(
  mapStateToProps, { }
)(App)


