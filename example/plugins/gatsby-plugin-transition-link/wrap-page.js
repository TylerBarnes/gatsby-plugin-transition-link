import React from 'react'
import TransitionHandler from './components/TransitionHandler'

export default ({ element, props }) => {
  return (
    <TransitionHandler location={props.location}>{element}</TransitionHandler>
  )
}
