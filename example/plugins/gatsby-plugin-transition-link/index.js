import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'
import { Consumer } from './store/createContext'

export default class TransitionLink extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event, timeout, updateExitTimeout, updateDelayNext, entryIn) {
    event.preventDefault()

    updateExitTimeout(timeout)
    updateDelayNext(entryIn)

    this.props.exitFn(timeout)

    navigate(this.props.to, {
      state: this.props.entryState,
    })

    setTimeout(() => updateExitTimeout(0), timeout)
    setTimeout(() => updateDelayNext(0), entryIn)
  }

  render() {
    const {
      props: { to, children },
    } = this

    return to && children ? (
      <Consumer>
        {({ updateExitTimeout, updateDelayNext }) => (
          <Link
            onClick={e =>
              this.handleClick(
                e,
                this.props.exitFor,
                updateExitTimeout,
                updateDelayNext,
                this.props.entryIn
              )
            }
            to={this.props.to}
          >
            {this.props.children}
          </Link>
        )}
      </Consumer>
    ) : null
  }
}
