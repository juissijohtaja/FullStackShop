/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMessages, createMessage, removeMessage } from '../reducers/messageReducer'

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
  Form
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'
import friendlyUrl from 'friendly-url'

import Products from './Products'
import ProductForm from './ProductForm'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'

const MessagesLayout = (props) => {
  useEffect(() => {
    props.fetchMessages()
  }, [])

  console.log('MessagesLayout props', props)
  console.log('MessagesLayout props', props.match.path)

  const [newMessage, setNewMessage] = useState('')

  const AddMessage = (e) => {
    e.preventDefault() // <- prevent form submit from reloading the page
    //const newMessageContent = { text: newMessage, friendlyUrl: friendlyUrl(newMessage) }
    //console.log('newMessageContent', newMessageContent)
    /* Send the message to Firebase */
    props.createMessage(newMessage)
    setNewMessage('') // <- clear the input
  }

  const handleRemove = (message) => {
    //e.preventDefault()
    props.removeMessage(message)
  }

  return(
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
          Messages Redux
          </Header>
          <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
          </p>
          <div>
            <List>
              {props.messages.map(message => <div key={message.id}>
                <ListItem as={Link} to={`${props.match.path}/${message.friendlyUrl}`} >{message.text}</ListItem>
                <Icon link name='remove' color='red' onClick={() => handleRemove(message)} />
              </div>)}
            </List>
          </div>
          <Header as='h4' style={{ fontSize: '2em' }}>
            Add message
          </Header>
          <Form onSubmit={AddMessage}>
            <div>
              <Form.Field>
                <input
                  type="text"
                  value={newMessage}
                  onChange={({ target }) => setNewMessage(target.value)}
                />
              </Form.Field>
            </div>
            <Button type='submit'>Save</Button>
          </Form>
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
  }
}
export default connect(
  mapStateToProps, { fetchMessages, createMessage, removeMessage }
)(withRouter(MessagesLayout))