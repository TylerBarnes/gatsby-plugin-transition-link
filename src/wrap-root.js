const React = require('react')
const InternalProvider = require('./context/InternalProvider').default

module.exports = ({ element }) => {
	return <InternalProvider>{element}</InternalProvider>
}
