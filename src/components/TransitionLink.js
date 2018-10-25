import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { triggerTransition } from '../utils/triggerTransition'
import { Consumer } from '../store/createContext'

const TransitionLink = ({
  to,
  children,
  exitFor,
  entryIn,
  exitFn,
  entryState,
}) => {
  return (
    <Consumer>
      {({ updateExitTimeout, updateDelayNext }) => (
        <Link
          onClick={event =>
            triggerTransition({
              event,
              updateExitTimeout,
              updateDelayNext,
              exitFor,
              entryIn,
              to,
              exitFn,
              entryState,
            })
          }
          to={to}
        >
          {children}
        </Link>
      )}
    </Consumer>
  )
}

TransitionLink.propTypes = {
  to: PropTypes.string.isRequired,
  exitFor: PropTypes.number,
  entryIn: PropTypes.number,
  exitFn: PropTypes.func,
  entryState: PropTypes.object,
}

export { TransitionLink }
