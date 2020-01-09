import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
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
  Form,
  Message
} from 'semantic-ui-react'

import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import { withRouter } from 'react-router-dom'

const LoginPageLayout = (props) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault() // <- prevent form submit from reloading the page

    if (username && password) {
      try {
        const user = { username, password }
        props.loginUser(user)
        console.log('perse', props.loggeduser)
        props.notificationSet('Login successful.', 'positive', 3)

        //clear the input
        setUserName('')
        setPassword('')
      } catch(exception) {
        props.notificationSet('Wrong credentials.', 'negative', 3)
      }
    } else {
      props.notificationSet('Username or password missing.', 'warning', 3)
    }
  }

  return(
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Tervetuloa takaisin!
            </Header>
            <Form size='large' onSubmit={handleLogin}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={username}
                  onChange={({ target }) => setUserName(target.value)} />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />

                <Button color='teal' fluid size='large'>
            Kirjaudu sisään
                </Button>
              </Segment>
            </Form>
            <Message>
                Vinkki: syötä kenttiin oikeat tunnukset
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
      <Footer />
    </ResponsiveContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    products: state.products,
    loggeduser: state.loggeduser
  }
}
export default connect(
  mapStateToProps, { loginUser, notificationSet }
)(withRouter(LoginPageLayout))