import React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { Consumer } from '../store/createContext'
import { withContext } from 'react-context-consumer-hoc'
import AppProvider from '../store/provider'

const TransitionWithContext = withContext(
  [Consumer],
  context => ({
    timeout: {
      enter: context.delayNext,
      exit: context.exitTimeout,
    },
  }) // mapContextToProps
)(Transition)

const TransitionHandler = props => {
  return (
    <AppProvider>
      <TransitionGroup>
        <TransitionWithContext key={props.location.pathname}>
          {state => {
            // use transition groups entering state to hide the incoming component
            const visibility = state === 'entering' ? 'hidden' : 'visible'

            return (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  visibility: visibility,
                }}
              >
                {props.children}
              </div>
            )
          }}
        </TransitionWithContext>
      </TransitionGroup>
    </AppProvider>
  )
}

export default TransitionHandler
