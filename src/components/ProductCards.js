import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
import {
  Icon,
  Image,
  Card
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Link, withRouter
} from 'react-router-dom'

import Stars from './Stars'


const ProductCard = (props) => {

  useEffect(() => {
    props.fetchProducts()
  }, [])

  /* const Stars = (loops) => {
    let stars = []
    for (let i = 0; i < loops.amount; i++) {
      stars.push(<Icon fitted name='star' color='yellow' size='small' key={i} />)
    }
    return stars
  } */

  const amount = props.amount ? props.amount : 18

  return (
    <Card.Group stackable itemsPerRow={props.itemsPerRow ? props.itemsPerRow : '3'}>
      {props.products.filter(item => props.category ? item.category === props.category : true).slice(0, amount).sort((a, b) => b.rating - a.rating).map(product =>
        <Card as={Link} to={`/tuotteet/${product.friendlyUrl}`} key={product.name}>
          <Image src={product.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta>
              <Stars amount={product.rating} size='small' />
            </Card.Meta>
            <Card.Content style={{ fontSize: '1.5em', color: 'black', fontWeight: '600', padding: '0.4em 0' }}>
              {product.price} <Icon name='euro sign' size='small' />
            </Card.Content>
            <Card.Description>
              {product.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='tag' /> {product.category}
          </Card.Content>
        </Card>
      )}
    </Card.Group>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct }
)(withRouter(ProductCard))