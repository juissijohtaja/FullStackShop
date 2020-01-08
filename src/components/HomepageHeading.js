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

import './HomepageHeading.css'


const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

console.log('HomepageHeading getWidth', getWidth())
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = () => (
  <Segment
    //inverted
    vertical
    textAlign='center'
    id='hero'
  >
    <Container text>
      <Header
        as='h1'
        content='Onpa hyvät tarjoukset'
        inverted
      />
      <Header
        as='h2'
        content='Tästä vähän lisää tietoa.'
        inverted
      />
      <Button primary size='huge'>
        Lue lisää
        <Icon name='right arrow' />
      </Button>
    </Container>
  </Segment>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default HomepageHeading