/*
 * adapted from @reach/router implementation:
 * defintion: https://github.com/reach/router/blob/master/src/index.js#L542-L545
 * usage: https://github.com/reach/router/blob/master/src/index.js#L391-L397
 */

const shouldNavigate = event =>
	!event.defaultPrevented &&
	event.button === 0 &&
	!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

export { shouldNavigate }
