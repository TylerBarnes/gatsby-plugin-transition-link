import React from 'react'
import TransitionLink from '../'
import gsap from 'gsap'

const boxShadow = '0 0 100px 10px rgba(0, 0, 0, 0.12941176470588237)'

const swipeTopDirection = (direction, reverse) => {
	const polarityPos = reverse ? '-' : '+'
	const polarityNeg = reverse ? '+' : '-'

	switch (direction) {
		case 'down':
			return { y: `${polarityPos}=100vh`, ease: "power1.easeIn" }
		case 'up':
			return { y: `${polarityNeg}=100vh`, ease: "power1.easeIn" }
		case 'left':
			return { x: `${polarityNeg}=100%`, ease: "power1.easeIn" }
		default:
			return { x: `${polarityPos}=100%`, ease: "power1.easeIn" }
	}
}

const swipeBottomDirection = (direction, reverse = false, offset = 40) => {
	const polarityPos = reverse ? '-' : ''
	const polarityNeg = reverse ? '' : '-'

	switch (direction) {
		case 'down':
			return { y: `${polarityNeg}${offset}vh`, ease: "power1.easeIn" }
		case 'up':
			return { y: `${polarityPos}${offset}vh`, ease: "power1.easeIn" }
		case 'left':
			return { x: `${polarityPos}${offset}%`, ease: "power1.easeIn" }
		default:
			return { x: `${polarityNeg}${offset}%`, ease: "power1.easeIn" }
	}
}

const swipe = ({ node, exit, direction, top, triggerName, entryOffset }) => {
	const scrollTop =
		(document.scrollingElement && document.scrollingElement.scrollTop) ||
		document.body.scrollTop ||
		window.pageYOffset

	if (triggerName === 'entry' && top === 'entry') {
		return gsap.timeline()
			.set(node, {
				boxShadow: boxShadow,
				overflowY: 'hidden',
				height: '100vh',
				scrollTop: scrollTop,
			})
			.from(node, { ...swipeTopDirection(direction, true), duration: exit.length })
			.set(node, { overflowY: 'initial' })
	} else if (triggerName === 'entry') {
		return gsap.timeline().from(
			node,
			{ 
				...swipeBottomDirection(direction, false, entryOffset),
				duration: exit.length,
			}
		)
	} else if (triggerName === 'exit' && top === 'exit') {
		return gsap.timeline()
			.set(node, {
				boxShadow: boxShadow,
				overflowY: 'hidden',
				height: '100vh',
				scrollTop: scrollTop,
			})
			.to(node, { ...swipeTopDirection(direction), duration: exit.length })
			.set(node, { overflowY: 'initial' })
	} else {
		return gsap.timeline()
			.set(node, {
				boxShadow: boxShadow,
				overflowY: 'hidden',
				height: '100vh',
				scrollTop: scrollTop,
			})
			.to(
				node,
				{ 
					...swipeBottomDirection(direction, true, entryOffset),
					duration: exit.length,
				},
			)
			.set(node, { overflowY: 'initial' })
	}
}

export default function SwipeOver({
	exit,
	entry,
	swipe: removedProp,
	entryOffset = 40,
	...props
}) {
	const top = props.top || 'exit'
	const exitLength = props.duration || 0.7
	const entryLength = exitLength / 3.5
	const entryZ = top === 'entry' ? 1 : 0
	const exitZ = top === 'exit' ? 1 : 0

	return (
		<TransitionLink
			exit={{
				length: exitLength,
				trigger: ({ node, exit }) =>
					swipe({
						node,
						exit,
						direction: props.direction,
						top: top,
						entryOffset,
						triggerName: 'exit',
					}),
				zIndex: exitZ,
			}}
			entry={{
				length: entryLength,
				trigger: ({ node, exit }) =>
					swipe({
						node,
						exit,
						direction: props.direction,
						top: top,
						entryOffset,
						triggerName: 'entry',
					}),
				zIndex: entryZ,
			}}
			{...props}>
			{props.children}
		</TransitionLink>
	)
}
