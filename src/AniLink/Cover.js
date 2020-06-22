import React, { Component } from 'react'
import TransitionLink, { TransitionPortal } from '../'
import gsap from 'gsap'

export default class Cover extends Component {
	constructor(props) {
		super(props)

		this.horizontal = this.horizontal.bind(this)
		this.vertical = this.vertical.bind(this)
	}

	getCoverEl = () => document.querySelector(`.tl-cover-el`)

	horizontal = ({ node, props: { length: seconds }, direction }) => {
		const directionTo = direction === 'left' ? '-100%' : '100%'
		const directionFrom = direction === 'left' ? '100%' : '-100%'

		const wait = seconds / 6
		const half = (seconds - wait) / 2

		const cover = this.getCoverEl()

		return gsap
			.timeline()
			.set(cover, { y: 0, x: directionFrom, display: "block" })
			.to(cover, {
				x: "0%",
				ease: "power1.easeInOut",
				duration: half,
			})
			.set(node, { opacity: 0 })
			.to(
				cover,
				{
					x: directionTo,
					ease: "power1.easeInOut",
					duration: half,
				},
				`+=${wait}`,
			)
	}

	vertical = ({ node, props: { length: seconds }, direction }) => {
		const directionTo = direction === 'up' ? '-100%' : '100%'
		const directionFrom = direction === 'up' ? '100%' : '-100%'

		const wait = seconds / 6
		const half = (seconds - wait) / 2

		const cover = this.getCoverEl()

		return gsap
			.timeline()
			.set(cover, { y: directionFrom })
			.to(cover, {
				y: "0%",
				ease: "power1.easeInOut",
				duration: half,
			})
			.set(node, { opacity: 0 })
			.to(
				cover,
				{
					y: directionTo,
					ease: "power1.easeIn",
					duration: half,
				},
				`+=${wait}`,
			)
	}

	moveInDirection = ({ props, direction, node }) => {
		if (direction === 'left' || direction === 'right') {
			return this.horizontal({ props, direction, node })
		}

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
					{...props}
				>
					{this.props.children}
				</TransitionLink>

				<TransitionPortal>
					<div
						className="tl-cover-el"
						style={{
							position: "fixed",
							background: this.props.bg || "#4b2571",
							top: 0,
							left: 0,
							right: 0,
							zIndex: 1000,
							width: "100vw",
							height: "100vh",
							transform: "translateY(100%)",
						}}
					/>
				</TransitionPortal>
			</>
		)
	}
}
