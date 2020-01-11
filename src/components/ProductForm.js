import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
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

const ProductForm = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [rating, setRating] = useState('')

  console.log('date', new Date().toJSON().slice(0,10).replace(/-/g,'/'))
  const kakka = ['2030/01/11', '2020/01/21', '2025/01/11']
  console.log('date normal', kakka)
  console.log('date sort', kakka.sort(function(a, b){return b-a}))

  const AddProduct = (e) => {
    e.preventDefault() // <- prevent form submit from reloading the page

    if (name && description && price) {
      const publishDate = new Date().toJSON().slice(0,10).replace(/-/g,'/')
      const newProduct = { name, description, price, category, image, rating, publishDate }
      console.log('newProduct', newProduct)
      /* Send the message to Firebase */
      props.createProduct(newProduct)
      props.notificationSet('Product added.', 'positive', 3)

      //clear the input
      setName('')
      setDescription('')
      setPrice('')
      setCategory('')
      setImage('')
      setRating('')

    } else {
      alert('Error: name, description or price missing')
    }
  }

  return (
    <Container>
      <h2>Lisää tuote</h2>
      <Form onSubmit={AddProduct}>
        <Form.Field>
          <label>Nimi</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Kuvaus</label>
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Hinta</label>
          <input
            type='number'
            value={price}
            onChange={({ target }) => setPrice(Number(target.value))}
          />
        </Form.Field>
        <Form.Field>
          <label>Kategoria</label>
          <input
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Kuvan URL</label>
          <input
            value={image}
            onChange={({ target }) => setImage(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Arvosana 1-5</label>
          <input
            value={rating}
            onChange={({ target }) => setRating(target.value)}
          />
        </Form.Field>
        <Button type='submit'>Tallenna</Button>
      </Form>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products,
    notification: state.notification
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct, notificationSet }
)(ProductForm)