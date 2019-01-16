import React from 'react'
import { Spring } from 'react-spring'
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'

const MySpring = ({ text }) => (
  <TransitionState>
    {({ transitionStatus, exit, entry }) => {
      const mount = ['entering', 'entered'].includes(transitionStatus)
      const duration = mount ? entry.length : exit.length

      return (
        <Spring
          to={{
            transform: `translateY(${mount ? 0 : '100px'})`,
            opacity: mount ? 1 : 0,
          }}
          config={{
            duration: duration,
          }}
        >
          {props => <div style={props}>{text}</div>}
        </Spring>
      )
    }}
  </TransitionState>
)

const SpringLink = ({ to, children }) => (
  <TransitionLink to={to} exit={{ length: 1 }} entry={{ length: 1 }}>
    {children}
  </TransitionLink>
)

export { MySpring, SpringLink }
