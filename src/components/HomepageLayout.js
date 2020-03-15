/* eslint-disable indent */
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
  Form,
  Card
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

import Products from './Products'
import ProductForm from './ProductForm'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import HomepageHeading from './HomepageHeading'
import ProductCards from './ProductCards'


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

  return(
    <ResponsiveContainer>

      <HomepageHeading />

      <Segment basic style={{ padding: '6em 0em 4em' }}>
        <Grid container stackable verticalAlign='top' columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Image
                bordered
                rounded
                size='large'
                as={Link}
                to='/tuotteet/pentax-spotmatic'
                label={{
                  color: 'orange',
                  content: 'Kuukauden tuote',
                  icon: 'camera',
                  ribbon: true,
                }}
                src='https://firebasestorage.googleapis.com/v0/b/fullstackshop.appspot.com/o/pentax-spotmatic.jpg?alt=media&token=7de5b907-9f25-4d55-8f99-38ba844baa6d' />
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' style={{ fontSize: '2em' }}>
              Pentax Spotmatic
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Ajaton klassikko Pentax Spotmatic filmikamera kuuluu jokaisen itseään kunnioittavan valokuvaajan työkalupakkiin.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                Irrottaudu tekoälyn kahleista - manuaalitarkennuksen ansiosta luovuus on sinun käsissäsi.
              </p>
              <Button as={Link} to='/tuotteet/pentax-spotmatic' color='teal'>Lue lisää</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment vertical style={{ padding: '0em 0em 8em' }}>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '4em 0em', textTransform: 'uppercase' }}
        >
          <a href='/tuotteet'>Uusimmat tuotteet</a>
        </Divider>
        <Container>
          <ProductCards amount='3' />
        </Container>
      </Segment>

      <Segment vertical secondary color='teal'>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' size='huge'>
                <Icon name='shipping fast'/> Huippunopea toimitus
              </Header>
              <p style={{ fontSize: '1.33em' }}>Tilaamasi tuotteet saapuvat kotiisi silmänräpäyksessä.</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' size='huge'>
                <Icon name='bullhorn'/> Aina halvat hinnat
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Parempia tarjouksia saa hakea.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
        <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '4em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Kaikki tuotteet</a>
          </Divider>
          <ProductCards itemsPerRow='4' />
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