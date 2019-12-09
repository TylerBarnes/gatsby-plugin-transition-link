import React, { Component, cloneElement } from 'react'
import { setTimeout, clearTimeout } from 'requestanimationframe-timer'
import { PublicProvider } from '../context/createTransitionContext'

export default class TransitionRenderer extends Component {
	state = {
		shouldBeVisible: !!!this.props.appearAfter,
	}

	shouldComponentUpdate(nextProps, nextState) {
		// only rerender if the transition status changes.
		return (
			this.props.transitionStatus !== nextProps.transitionStatus ||
			this.state.shouldBeVisible !== nextState.shouldBeVisible
		)
	}

	componentDidMount = () => {
		const delay =
			typeof this.props.delay === 'number' ? this.props.delay : 0
		const appearafter =
			typeof this.props.appearAfter === 'number'
				? this.props.appearAfter
				: 0
		const timeout = delay + appearafter

		this.appearTimeout = setTimeout(
			() => this.setState({ shouldBeVisible: true }),
			timeout
		)
	}

	componentWillUnmount = () => {
		clearTimeout(this.appearTimeout)
	}

	render() {
		const {
			mount,
			entryZindex,
			exitZindex,
			transitionStatus,
			transitionState,
			children,
			injectPageProps,
		} = this.props

		return (
			<div
				className={`tl-wrapper ${
					mount ? 'tl-wrapper--mount' : 'tl-wrapper--unmount'
				} tl-wrapper-status--${transitionStatus}`}
				style={{
					zIndex: mount ? entryZindex : exitZindex,
					opacity: this.state.shouldBeVisible ? 1 : 0,
				}}>
				<PublicProvider value={{ ...transitionState }}>
					{/* pass transition state to page/template */}
					{// injectPageProps is a plugin option
					injectPageProps
						? cloneElement(children, {
								...transitionState,
						  })
						: children}
				</PublicProvider>
			</div>
		)
	}
}
