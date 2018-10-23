import React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { Consumer } from '../store/createContext'
import AppProvider from '../store/provider'

const TransitionHandler = props => {
  return (
    <AppProvider>
      <Consumer>
        {({ delayNext, exitTimeout }) => (
          <TransitionGroup>
            <Transition
              timeout={{ enter: delayNext, exit: exitTimeout }}
              key={props.location.pathname}
            >
              {state => {
                // use transition groups entering state to hide the incoming component
                // supposedly this should instead be done with a setTimeout and the in prop... https://github.com/reactjs/react-transition-group/issues/284
                // This works for now.
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
            </Transition>
          </TransitionGroup>
        )}
      </Consumer>
    </AppProvider>
  )
}

export default TransitionHandler
