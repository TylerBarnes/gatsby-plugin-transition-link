import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'

import { Consumer } from './store/createContext'

export default class TransitionLink extends Component {
  handleClick({ event, exitFor, updateExitTimeout, updateDelayNext, entryIn }) {
    event.preventDefault()

    updateExitTimeout(exitFor)
    updateDelayNext(entryIn)

    this.props.exitFn(exitFor)

    navigate(this.props.to, {
      state: this.props.entryState,
    })

    setTimeout(() => updateExitTimeout(0), exitFor)
    setTimeout(() => updateDelayNext(0), entryIn)
  }

  render() {
    const {
      props: { to, children },
    } = this

    return (
      <Consumer>
        {({ updateExitTimeout, updateDelayNext }) => (
          <Link
            onClick={event =>
              this.handleClick({
                event,
                updateExitTimeout,
                updateDelayNext,
                exitFor: this.props.exitFor,
                entryIn: this.props.entryIn,
              })
            }
            to={this.props.to}
          >
            {this.props.children}
          </Link>
        )}
      </Consumer>
    )
  }
}

TransitionLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  exitFor: PropTypes.number,
  entryIn: PropTypes.number,
  exitFn: PropTypes.func,
  entryState: PropTypes.object,
}
