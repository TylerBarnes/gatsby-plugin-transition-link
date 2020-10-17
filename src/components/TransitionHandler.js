import React, { Component } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { Location } from '@reach/router'

import TransitionRenderer from './TransitionRenderer'
import delayTransitionRender from './delayTransitionRender'
import { Consumer } from '../context/createTransitionContext'
import { onEnter } from '../functions/onEnter'
import { onExit } from '../functions/onExit'
import { getMs } from '../utils/secondsMs'

import '../style.css'

const DelayedTransition = delayTransitionRender(Transition)
export default class TransitionHandler extends Component {
	render() {
		const { props } = this
		const { children, injectPageProps = true } = props

		return (
			<Consumer>
				{({
					exitDelay,
					exitLength,
					exitState,
					entryDelay,
					entryLength,
					entryState,
					entryTrigger,
					entryProps,
					exitTrigger,
					exitProps,
					inTransition,
					updateContext,
					triggerResolve,
					appearAfter,
					preventScrollJump,
					hash,
					e,
				}) => {
					return (
						<Location>
							{({ location }) => {
								const {
									action,
									pathname,
									key: locationKey,
								} = location

								return (
									<div className="tl-edges">
										<TransitionGroup component={null}>
											<DelayedTransition
												key={pathname} // we're using seconds but transitiongroup uses ms
												delay={getMs(entryDelay)}
												timeout={{
													enter: getMs(entryLength),
													exit: getMs(exitLength),
												}}
												onEnter={node =>
													!!node &&
													!window.__tl_back_button_pressed &&
													onEnter({
														node,
														action,
														inTransition,
														entryTrigger,
														entryProps,
														exitProps,
														pathname,
														updateContext,
														triggerResolve,
														preventScrollJump,
														hash,
														locationKey,
														appearAfter: getMs(
															appearAfter
														),
														e,
													})
												}
												onExit={node =>
													!!node &&
													!window.__tl_back_button_pressed &&
													onExit({
														node,
														inTransition,
														exitTrigger,
														entryProps,
														exitProps,
														triggerResolve,
														e,
													})
												}>
												{transitionStatus => {
													const mount =
														transitionStatus ===
															'entering' ||
														transitionStatus ===
															'entered'

													const states = {
														entry: {
															state: entryState,
															delay: entryDelay,
															length: entryLength,
														},
														exit: {
															state: exitState,
															delay: exitDelay,
															length: exitLength,
														},
													}

													const current = mount
														? states.entry
														: states.exit

													const transitionState = {
														transitionStatus,
														current,
														mount,
														...states,
													}

													const exitZindex =
														exitProps.zIndex || 0
													const entryZindex =
														entryProps.zIndex || 1

													return (
														<TransitionRenderer
															mount={mount}
															entryZindex={
																entryZindex
															}
															exitZindex={
																exitZindex
															}
															transitionStatus={
																transitionStatus
															}
															transitionState={
																transitionState
															}
															children={children}
															injectPageProps={
																injectPageProps
															}
															appearAfter={getMs(
																appearAfter
															)}
														/>
													)
												}}
											</DelayedTransition>
										</TransitionGroup>
									</div>
								)
							}}
						</Location>
					)
				}}
			</Consumer>
		)
	}
}
