import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, createProduct, removeProduct } from '../reducers/productReducer'
import { notificationSet } from '../reducers/notificationReducer'

import {
  Button,
  Container,
  Form,
  Message
} from 'semantic-ui-react'

const ProductForm = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [rating, setRating] = useState('')
  const [formConfirmed, setFormConfirmed] = useState(false)

  useEffect(() => {
    if(name && description && price && category && image && rating) {
      setFormConfirmed(true)
      console.log('formConfirmed', formConfirmed)
    } else {
      setFormConfirmed(false)
      console.log('formConfirmed', formConfirmed)
    }
  })

  const admin = props.loggeduser.user.uid === 'GQ54E1iIjrMtX7orwFREnYHHiFD3' ? true : false

  const AddProduct = (e) => {
    e.preventDefault() // <- prevent form submit from reloading the page

    if (formConfirmed) {
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
      alert('Lomakkeesta puuttuu tietoja. Täytä kaikki vaaditut kentät.')
    }
  }

  const ratingOptions = [
    { key: '1', text: '1', value: 1 },
    { key: '2', text: '2', value: 2 },
    { key: '3', text: '3', value: 3 },
    { key: '4', text: '4', value: 4 },
    { key: '5', text: '5', value: 5 }
  ]

  const categoryOptions = [
    { key: 'hifi', text: 'hifi', value: 'hifi' },
    { key: 'valokuvaus', text: 'valokuvaus', value: 'valokuvaus' },
    { key: 'kellot', text: 'kellot', value: 'kellot' },
    { key: 'polkupyörät', text: 'polkupyörät', value: 'polkupyörät' },
    { key: 'ulkoilu', text: 'ulkoilu', value: 'ulkoilu' },
    { key: 'koti', text: 'koti', value: 'koti' }
  ]

  return (
    <Container>
      <h2>Lisää tuote</h2>
      <Form onSubmit={AddProduct} className={formConfirmed ? 'success' : 'warning'}>
        <Form.Input
          required
          className={name? '': 'error'}
          label='Nimi'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <Form.TextArea
          required
          className={description? '': 'error'}
          label='Kuvaus'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Form.Input
          required
          className={price? '': 'error'}
          label='Hinta'
          type='number'
          value={price}
          onChange={({ target }) => setPrice(Number(target.value))}
        />
        <Form.Select
          required
          fluid
          className={category? '': 'error'}
          label='Kategoria'
          options={categoryOptions}
          value={category}
          placeholder='Valitse vaihtoehto'
          onChange={(e, { value }) => setCategory(value)}
        />
        <Form.Input
          required
          className={image? '': 'error'}
          label='Kuvan URL'
          value={image}
          onChange={({ target }) => setImage(target.value)}
        />
        <Form.Select
          required
          fluid
          className={rating? '': 'error'}
          label='Arvosana'
          options={ratingOptions}
          value={rating}
          placeholder='Valitse vaihtoehto'
          onChange={(e, { value }) => setRating(value)}
        />
        {admin ? <Button type='submit' fluid color='teal' size='big'>Tallenna</Button> :
          <Button fluid disabled size='big'>Tallenna</Button> }

        <Message
          success
          header='Kaikki kunnossa!'
          content="Lomake on täytetty oikein ja voidaan lähettää. Huom! Ainoastaan pääkäyttäjä voi lisätä tuotteita."
        />
        <Message
          warning
          header='Tarkista lomake'
          content="Lomake ei ole täytetty oikein ja sitä ei voida vielä lähettää."
        />
      </Form>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products,
    notification: state.notification,
    loggeduser: state.loggeduser
  }
}
export default connect(
  mapStateToProps, { fetchProducts, createProduct, removeProduct, notificationSet }
)(ProductForm)