import React from 'react'

import {
  Icon
} from 'semantic-ui-react'

const Stars = (props) => {
  let stars = []
  for (let i = 0; i < props.amount; i++) {
    stars.push(<Icon fitted name='star' color='yellow' size={props.size} key={i} />)
  }
  for (let i = 0; i < 5-props.amount; i++) {
    stars.push(<Icon fitted name='star' color='grey' inverted size={props.size} key={i+5} />)
  }
  return stars
}

export default Stars