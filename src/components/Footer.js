import React from 'react'

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

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, NavLink
} from 'react-router-dom'

const Footer = () => {
  //console.log('Footer render')

  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              <Header as='h4' inverted>
                Full Stack Shop
              </Header>
              <List link inverted>
                <List.Item as={Link} to='/'>Etusivu</List.Item>
                <List.Item as={Link} to='/tuotteet'>Tuotteet</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Tietoja sivustosta
              </Header>
              <p>
                Tämä sivusto on Full Stack -websovelluskehitys kurssin harjoitustyö. Sivustolla näkyvät tuotteet eivät ole oikeasti myynnissä.
              </p>
              <p><a target='_blank' rel="noopener noreferrer" href='https://fullstackopen.com/'><Icon name='external'/> Full Stack Open</a></p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}

export default Footer