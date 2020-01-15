import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Responsive,
  Segment,
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

import './HomepageHeading.css'


const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

console.log('HomepageHeading getWidth', getWidth())

const HomepageHeading = () => (
  <Segment
    vertical
    textAlign='center'
    id='hero'
  >
    <Container text>
      <Header
        as='h1'
        content='Kaupungin vihrein kiituri'
        inverted
      />
      <Header
        as='h2'
        content='Tyylikäs retropyörä nyt saatavilla.'
        inverted
      />
      <Button size='huge' color='teal' as={Link} to='/tuotteet/vihreae-sinkula-polkupyoerae' >
        Osta tästä
        <Icon name='right arrow' />
      </Button>
    </Container>
  </Segment>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default HomepageHeading