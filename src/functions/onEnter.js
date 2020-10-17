import { setTimeout } from 'requestanimationframe-timer'

const onEnter = ({
	node,
	inTransition,
	entryTrigger,
	entryProps,
	exitProps,
	triggerResolve,
	pathname,
	preventScrollJump,
	hash,
	locationKey,
	entryProps: { delay = 0 },
	appearAfter = 0,
	e,
}) => {
	if (inTransition && !preventScrollJump) {
		setTimeout(() => {
			let scrollTo = [0, 0]

			// handle hashes that link to ID's
			// for ex /page-2#heading-section
			if (hash) {
				const hashElement = document.getElementById(hash)

				if (hashElement) {
					const clientOffsetTop = hashElement.offsetTop
					scrollTo = [0, clientOffsetTop]
				}
			}

			window.scrollTo(...scrollTo)
		}, appearAfter)
	} else if (!inTransition) {
		// If session storage fails due to cookies being disabled,
		// scroll to the top after every navigation
		let position = [0, 0]
		try {
			const storageKey = `@@scroll|${pathname}|${locationKey}`
			const y = JSON.parse(sessionStorage.getItem(storageKey)) || 0

			position = [0, y]
		} catch (e) {
			console.warn(
				`[gatsby-plugin-transition-link] Unable to save state in sessionStorage; sessionStorage is not available.`
			)
		} finally {
			window.scrollTo(...position)
		}
	}

	if (!inTransition) return

	const { trigger: removed, ...entryPropsTrimmed } = entryProps

	const timeout = appearAfter + delay

	const visiblePromise = new Promise(resolve => {
		setTimeout(() => resolve(), timeout)
	})

	triggerResolve.entry({
		...entryPropsTrimmed,
		visible: visiblePromise,
		node,
	})

	entryTrigger &&
		typeof entryTrigger === 'function' &&
		entryTrigger({
			entry: entryProps,
			exit: exitProps,
			node,
			e,
		})
}

export { onEnter }
