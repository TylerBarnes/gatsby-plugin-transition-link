import React, { Component } from 'react'
import { setTimeout, clearTimeout } from 'requestanimationframe-timer'

export default function delayTransitionRender(WrappedComponent) {
	class DelayedTransitionWrapper extends Component {
		constructor(props) {
			super(props)

			this.state = {
				// if there is a delay, set shouldRender to false
				// then in componentdid mount shouldRender becomes true
				// after the delay.
				shouldRender: !!!this.props.delay,
			}
		}

		componentDidMount() {
			this.renderTimeout = setTimeout(
				() => this.setState({ shouldRender: true }),
				this.props.delay
			)
		}

		componentWillUnmount() {
			clearTimeout(this.renderTimeout)
		}

		render() {
			return this.state.shouldRender || typeof window === `undefined` ? (
				<WrappedComponent {...this.props} />
			) : null
		}
	}

	return DelayedTransitionWrapper
}
