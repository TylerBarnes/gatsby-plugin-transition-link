import React, { Component } from 'react'
import TransitionLink, { TransitionPortal } from '../'
import { TimelineMax, Power1 } from 'gsap'

export default class Cover extends Component {
	constructor(props) {
		super(props)

		this.horizontal = this.horizontal.bind(this)
		this.vertical = this.vertical.bind(this)

		this.cover = React.createRef()
	}

	horizontal = ({ node, props: { length: seconds }, direction }) => {
		const directionTo = direction === 'left' ? '-100%' : '100%'
		const directionFrom = direction === 'left' ? '100%' : '-100%'

		const wait = seconds / 6
		const half = (seconds - wait) / 2

		return new TimelineMax()
			.set(this.cover, { y: 0, x: directionFrom, display: 'block' })
			.to(this.cover, half, {
				x: '0%',
				ease: Power1.easeInOut,
			})
			.set(node, { opacity: 0 })
			.to(
				this.cover,
				half,
				{
					x: directionTo,
					ease: Power1.easeInOut,
				},
				`+=${wait}`
			)
	}

	vertical = ({ node, props: { length: seconds }, direction }) => {
		const directionTo = direction === 'up' ? '-100%' : '100%'
		const directionFrom = direction === 'up' ? '100%' : '-100%'

		const wait = seconds / 6
		const half = (seconds - wait) / 2

		return new TimelineMax()
			.set(this.cover, { y: directionFrom })
			.to(this.cover, half, {
				y: '0%',
				ease: Power1.easeInOut,
			})
			.set(node, { opacity: 0 })
			.to(
				this.cover,
				half,
				{
					y: directionTo,
					ease: Power1.easeIn,
				},
				`+=${wait}`
			)
	}

	moveInDirection = ({ props, direction, node }) => {
		if (direction === 'left' || direction === 'right')
			return this.horizontal({ props, direction, node })

		return this.vertical({ props, direction, node })
	}

	render() {
		const direction = this.props.direction || 'left'
		const length = this.props.duration || 1
		const {
			exit: removedExit,
			entry: removedEntry,
			cover: removedProp,
			...props
		} = this.props
		return (
			<>
				<TransitionLink
					exit={{
						length: length,
						trigger: ({ exit, node }) =>
							this.moveInDirection({
								props: exit,
								node,
								direction,
							}),
					}}
					entry={{
						delay: length / 2,
					}}
					{...props}>
					{this.props.children}
				</TransitionLink>

				<TransitionPortal>
					<div
						ref={n => (this.cover = n)}
						style={{
							position: 'fixed',
							background: this.props.bg || '#4b2571',
							top: 0,
							left: 0,
							width: '100vw',
							height: '100vh',
							transform: 'translateY(100%)',
						}}
					/>
				</TransitionPortal>
			</>
		)
	}
}
