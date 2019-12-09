const React = require('react')
const TransitionHandler = require('./components/TransitionHandler').default
const InternalProvider = require('./context/InternalProvider').default

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }, pluginOptions) => {
	return (
		<TransitionHandler {...props} {...pluginOptions}>
			{element}
		</TransitionHandler>
	)
}
