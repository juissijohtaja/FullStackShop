import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Label,
  Dropdown
} from 'semantic-ui-react'

import {
  BrowserRouter as Router, withRouter, NavLink
} from 'react-router-dom'
import { connect } from 'react-redux'


const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const DesktopContainer = (props) => {
  const [fixed, setFixed] = useState()
  console.log('DesktopContainer props', props)

  const hideFixedMenu = () => {
    console.log('hideFixedMenu')
    setFixed(false)
  }
  const showFixedMenu = () => {
    console.log('showFixedMenu')
    setFixed(true)
  }

  console.log('cartItems', props.cartItems)

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={() => showFixedMenu()}
        onBottomPassedReverse={() => hideFixedMenu()}
        offset='-500'
      >
        <Segment
          inverted
          textAlign='center'
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size='large'
          >
            <Container>
              <Menu.Item as={NavLink} to='/' exact>Etusivu</Menu.Item>
              <Dropdown item text='Tuotteet'>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to='/tuotteet'>Kaikki</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to='/valokuvaus'>Valokuvaus</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to='/polkupyorat'>Polkupyörät</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to='/hifi'>Hifi</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item position='right'>
                {props.loggeduser.username ?
                  <Button as={NavLink} to='/yllapito' inverted={!fixed}>
                    Ylläpito
                  </Button> :
                  <Button as={NavLink} to='/kirjaudu' inverted={!fixed}>
                    Kirjaudu
                  </Button>
                }
                <Button as={NavLink} to='/ostoskori' color={fixed? 'teal' : 'black'} inverted={!fixed} style={{ marginLeft: '0.5em' }}>
                  <Icon aria-hidden='true' name='shopping basket' /> Ostoskori {props.cartItems>0 ? <Label color='red' size='small' floating>{props.cartItems}</Label> : null}
                </Button>
              </Menu.Item>

            </Container>
          </Menu>
        </Segment>
      </Visibility>

      <Notification/>
      {props.children}

    </Responsive>
  )

}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const MobileContainer = (props) => {
  const [sidebarOpened, setSidebarOpened] = useState()

  const handleSidebarHide = () => setSidebarOpened(false)
  const handleToggle = () => setSidebarOpened(true)

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation='push'
        inverted
        onHide={() => handleSidebarHide()}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item as={NavLink} to='/' exact>Etusivu</Menu.Item>
        <Menu.Item as={NavLink} to='/tuotteet'>Kaikki tuotteet</Menu.Item>
        <Menu.Item as={NavLink} to='/valokuvaus'>Valokuvaus</Menu.Item>
        <Menu.Item as={NavLink} to='/polkupyorat'>Polkupyörät</Menu.Item>
        <Menu.Item as={NavLink} to='/hifi'>Hifi</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          inverted
          textAlign='center'
          style={{ padding: '1em 0em' }}
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size='large'>
              <Menu.Item onClick={() => handleToggle()}>
                <Icon name='sidebar' />
              </Menu.Item>
              <Menu.Item position='right'>
                {props.loggeduser.username ?
                  <Button as={NavLink} to='/yllapito' inverted>
                    Ylläpito
                  </Button> :
                  <Button as={NavLink} to='/kirjaudu' inverted>
                    Kirjaudu
                  </Button>
                }
                <Button as={NavLink} to='/ostoskori' inverted style={{ marginLeft: '0.5em' }}>
                  <Icon aria-hidden='true' name='shopping basket' /> Ostoskori {props.cartItems>0 ? <Label color='red' size='small' floating>{props.cartItems}</Label> : null}
                </Button>
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>

        <Notification/>
        {props.children}

      </Sidebar.Pusher>
    </Responsive>
  )
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = (props) => {
  const [cartItems, setCartItems] = useState(0)
  const loggeduser = props.loggeduser

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const countCartItems = () => {
      props.shoppingcart.map(item => {
        //const productSum = item.product.price * item.amount
        cartItemSum += item.amount
      })
    }
    let cartItemSum = 0
    countCartItems()
    setCartItems(cartItemSum)
  }, [props.shoppingcart])

  return(
    <div>
      <DesktopContainer loggeduser={loggeduser} notification cartItems={cartItems}>{props.children}</DesktopContainer>
      <MobileContainer loggeduser={loggeduser} notification cartItems={cartItems}>{props.children}</MobileContainer>
    </div>
  )
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

//export default ResponsiveContainer
const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    loggeduser: state.loggeduser,
    notification: state.notification,
    shoppingcart: state.shoppingcart
  }
}
export default connect(
  mapStateToProps, null
)(withRouter(ResponsiveContainer))