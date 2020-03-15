import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signupUser } from '../reducers/signupReducer'
import { notificationSet } from '../reducers/notificationReducer'

import {
  Button,
  Grid,
  Header,
  Segment,
  Form,
  Message
} from 'semantic-ui-react'

import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import { withRouter } from 'react-router-dom'

const LoginPageLayout = (props) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (event) => {
    event.preventDefault() // <- prevent form submit from reloading the page

    if (username && password) {
      try {
        const user = { username, password }
        props.signupUser(user)
        props.notificationSet('Signup successful.', 'positive', 3)

        //clear the input
        setUserName('')
        setPassword('')
      } catch(exception) {
        props.notificationSet('Signup unsuccessful.', 'negative', 3)
      }
    } else {
      props.notificationSet('Email or password missing.', 'negative', 3)
    }
  }

  return(
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Luo käyttäjätunnukset
            </Header>
            <Form size='large' onSubmit={handleSignUp}>
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
                  Rekisteröidy
                </Button>
              </Segment>
            </Form>
            <Message>
              Jos sinulla on jo tunnukset, voit <a href='/kirjaudu'>kirjautua sisään</a>
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
  mapStateToProps, { signupUser, notificationSet }
)(withRouter(LoginPageLayout))