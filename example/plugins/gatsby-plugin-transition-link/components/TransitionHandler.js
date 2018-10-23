import React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
// import TransitionGroup from 'react-transition-group'
import { Consumer } from '../store/createContext'
import { withContext } from 'react-context-consumer-hoc'
import Delayed from './Delayed'
import AppProvider from '../store/provider'

const TransitionWithContext = withContext(
  [Consumer],
  context => ({ timeout: context.exitTimeout }) // mapContextToProps
)(Transition)

const DelayedWithContext = withContext(
  [Consumer],
  context => ({ wait: context.delayNext }) // mapContextToProps
)(Delayed)

const TransitionHandler = props => {
  return (
    <AppProvider>
      <TransitionGroup>
        <TransitionWithContext key={props.location.pathname}>
          <div style={{ position: 'absolute', width: '100%' }}>
            <DelayedWithContext>{props.children}</DelayedWithContext>
          </div>
        </TransitionWithContext>
      </TransitionGroup>
    </AppProvider>
  )
}

export default TransitionHandler
