import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../reducers/loginReducer'
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
  const [username, setUserName] = useState('admin@admin.fi')
  const [password, setPassword] = useState('admin123')

  useEffect(() => {
    console.log('loginpage loggeduser', props.loggeduser)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault() // <- prevent form submit from reloading the page

    if (username && password) {
      try {
        const user = { username, password }
        await props.loginUser(user)
        props.notificationSet('Wrong credentials.', 'negative', 3)

        //clear the input
        //setUserName('')
        //setPassword('')
      } catch(exception) {
        props.notificationSet('Wrong credentials.', 'negative', 3)
      }
    } else {
      props.notificationSet('Username or password missing.', 'negative', 3)
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
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Sähköpostiosoite' value={username}
                  onChange={({ target }) => setUserName(target.value)} />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Salasana'
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
              Kokeile tunnusta admin@admin.fi ja salasanaa admin123
            </Message>
            <Message>
              Jos sinulla ei ole tunnuksia, voit <a href='/rekisteroidy'>luoda tunnukset</a>
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
  mapStateToProps, { loginUser, logoutUser, notificationSet }
)(withRouter(LoginPageLayout))