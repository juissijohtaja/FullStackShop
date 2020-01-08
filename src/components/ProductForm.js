import React, { useState } from 'react'
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

  const AddProduct = (e) => {
    e.preventDefault() // <- prevent form submit from reloading the page

    if (name && description && price) {
      const newProduct = { name, description, price, category }
      console.log('newProduct', newProduct)
      /* Send the message to Firebase */
      props.createProduct(newProduct)

      //clear the input
      setName('')
      setDescription('')
      setPrice('')
      setCategory('')

    } else {
      alert('Error: name, description or price missing')
    }
  }

  return (
    <Segment>
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
        <Button type='submit'>Tallenna</Button>
      </Form>
    </Segment>
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
)(ProductForm)