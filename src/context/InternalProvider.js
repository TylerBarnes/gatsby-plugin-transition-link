import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './createTransitionContext'
import getPagesPromises from '../utils/getPagesPromises'

class InternalProvider extends Component {
	constructor(props) {
		super(props)
		const prefersReducedMotionSetting = window.matchMedia('(prefers-reduced-motion: reduce)')

		const prefersReducedMotion =
			typeof window !== `undefined` && prefersReducedMotionSetting
			
		if (prefersReducedMotionSetting.matches && process.env.NODE_ENV === `development`) {
			console.warn(
				`[gatsby-plugin-transition-link] Warning! prefers-reduced-motion is activated via your OS settings. This means TransitionLink animations will not run.`,
			)
		}

		this.state = {
			inTransition: false,
			disableAnimation: prefersReducedMotion.matches,
			// event
			e: false,
			// exit
			exitDelay: 0,
			exitLength: 0,
			exitState: {},
			exitProps: {},
			exitTrigger: false,
			// entry
			entryDelay: 0,
			entryLength: 0,
			entryState: {},
			entryProps: {},
			entryTrigger: false,
			// state updates
			updateContext: obj => this.setState(obj),
		}

		if (
			prefersReducedMotion &&
			typeof prefersReducedMotion.addEventListener === `function`
		) {
			prefersReducedMotion.addEventListener('change', () => {
				this.setState({
					disableAnimation: prefersReducedMotion.matches,
				})
			})
		} else if (
			prefersReducedMotion &&
			typeof prefersReducedMotion.addListener === `function`
		) {
			prefersReducedMotion.addListener(() => {
				this.setState({
					disableAnimation: prefersReducedMotion.matches,
				})
			})
		}
	}

	componentDidMount() {
		this.state.updateContext(getPagesPromises())
	}

	render() {
		return <Provider value={this.state}>{this.props.children}</Provider>
	}
}

InternalProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export default InternalProvider
