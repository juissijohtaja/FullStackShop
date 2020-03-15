import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Label,
  Image
} from 'semantic-ui-react'

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router, withRouter, NavLink, Link
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
            inverted
            pointing={!fixed}
            secondary={!fixed}
            size='large'
          >
            <Container>
              <Menu.Item as={Link} to='/' style={{ padding: '0 1.4em 0.3em 0' }}><Image avatar src='https://firebasestorage.googleapis.com/v0/b/fullstackshop.appspot.com/o/logo%2Flogo-w.png?alt=media&token=2e56acde-0fde-4af3-92f9-c4d0353bb0dd'></Image></Menu.Item>
              <Menu.Item as={NavLink} to='/' exact>Etusivu</Menu.Item>
              <Menu.Item as={NavLink} to='/tuotteet'>Tuotteet</Menu.Item>
              <Menu.Item as={NavLink} to='/valokuvaus'>Valokuvaus</Menu.Item>
              <Menu.Item as={NavLink} to='/polkupyörät'>Polkupyörät</Menu.Item>
              <Menu.Item as={NavLink} to='/hifi'>Hifi</Menu.Item>
              <Menu.Item position='right' style={{ paddingBottom: '0.4em' }}>
                {props.loggeduser ?
                  <NavLink to='/kirjaudu' ><Icon name='user' /></NavLink> :
                  <NavLink to='/kirjaudu' ><Icon name='user' /></NavLink>
                }
                <NavLink to='/ostoskori'><Icon name='shopping basket' style={{ marginLeft: '1.0em' }} />{props.cartItems>0 ? <Label color='red' size='small' circular style={{ position: 'relative', left:'-0.6em', top:'-1.0em' }}>{props.cartItems}</Label> : null}</NavLink>
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
        <Menu.Item as={NavLink} to='/'>Etusivu</Menu.Item>
        <Menu.Item as={NavLink} to='/tuotteet'>Tuotteet</Menu.Item>
        <Menu.Item as={NavLink} to='/valokuvaus'>Valokuvaus</Menu.Item>
        <Menu.Item as={NavLink} to='/polkupyörät'>Polkupyörät</Menu.Item>
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
              <Menu.Item as={Link} to='/' position='right' style={{ left: '1.0em', padding: '0 0em 0.3em 0' }}>
                <Image avatar src='https://firebasestorage.googleapis.com/v0/b/fullstackshop.appspot.com/o/logo%2Flogo-w.png?alt=media&token=2e56acde-0fde-4af3-92f9-c4d0353bb0dd'></Image>
              </Menu.Item>
              <Menu.Item position='right' style={{ paddingBottom: '0.4em' }}>
                {props.loggeduser ?
                  <NavLink to='/kirjaudu' ><Icon name='user' /></NavLink> :
                  <NavLink to='/kirjaudu' ><Icon name='user' /></NavLink>
                }
                <NavLink to='/ostoskori'><Icon name='shopping basket' style={{ marginLeft: '1.0em' }} />{props.cartItems>0 ? <Label color='red' size='small' circular style={{ position: 'relative', left:'-0.6em', top:'-1.0em' }}>{props.cartItems}</Label> : null}</NavLink>
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