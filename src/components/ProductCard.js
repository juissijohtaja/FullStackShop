import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
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
  Card
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

const ProductCard = (props) => {

  useEffect(() => {
    props.fetchProducts()
  }, [])

  return (
    <Card href='/tuotteet'>
      <Image src='https://firebasestorage.googleapis.com/v0/b/fullstackshop.appspot.com/o/camera.jpg?alt=media&token=27ecc85d-83b1-46cf-8daf-928bf0fa1224' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Brand new camera</Card.Header>
        <Card.Meta>
          <Icon fitted name='star' color='yellow' size='small' />
          <Icon fitted name='star' color='yellow' size='small' />
          <Icon fitted name='star' color='yellow' size='small' />
          <Icon fitted name='star' color='yellow' size='small' />
          <Icon fitted name='star' color='yellow' size='small' />
        </Card.Meta>
        <Card.Content>
          <span color='red'>129 €</span>
        </Card.Content>
        <Card.Description>
           This is the greatest camera that has ever existed.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' /> 22 Friends
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct }
)(withRouter(ProductCard))