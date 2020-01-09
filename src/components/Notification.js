import React from 'react'
import { connect } from 'react-redux'
import { Message, Container } from 'semantic-ui-react'

import styled from 'styled-components'

const StyledMessage = styled(Message)`
  &&& {
    margin-top: 1em;
  }
`

const Notification = (props) => {
  console.log('Notification:', props.notification)
  if (props.notification === null) {
    return null
  }
  return (
    <Container>
      <StyledMessage className={props.notification.style} header={props.notification.text} />
    </Container>
  )
}
const mapStateToProps = (state) => {
  console.log('STATE', state)
  return {
    notification: state.notification,
  }
}
export default connect(mapStateToProps, null)(Notification)