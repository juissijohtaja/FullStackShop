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
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Form
} from 'semantic-ui-react'

import Products from './Products'
import ProductForm from './ProductForm'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import HomepageHeading from './HomepageHeading'

const HomepageLayout = (props) => {
  useEffect(() => {
    props.fetchMessages()
  }, [])

  const [newMessage, setNewMessage] = useState('')

  const AddMessage = (e) => {
    e.preventDefault() // <- prevent form submit from reloading the page
    props.createMessage(newMessage)
    setNewMessage('') // <- clear the input
  }

  const handleRemove = (message) => {
    //e.preventDefault()
    props.removeMessage(message)
  }

  return(
    <ResponsiveContainer>
      <HomepageHeading />
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Companies and Companions
              </Header>
              <p style={{ fontSize: '1.33em' }}>
              We can give your company superpowers to do things that they never thought possible.
              Let us delight your customers and empower your needs... through pure data analytics.
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
              We Make Bananas That Can Dance
              </Header>
              <p style={{ fontSize: '1.33em' }}>
              You thought it was the stuff of dreams, but even bananas can be
              bioengineered.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge'>Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
              What a Company
              </Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
              I shouldnt have gone with their competitor.
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
          </p>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Case Studies</a>
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
          </Header>
          <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          its really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
          </p>
          <Button as='a' size='large'>
          Im Still Quite Interested
          </Button>
          <div>
            <h3>Messages Redux</h3>
            <ul>
              {props.messages.map(message => <li key={message.id}>{message.text} <Icon link name='remove' color='red' onClick={() => handleRemove(message)} /></li>)}
            </ul>
          </div>
          <Form onSubmit={AddMessage}>
            <div>
              <Form.Field>
                <label>Add message</label>
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
)(HomepageLayout)