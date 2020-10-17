const React = require('react')
const { navigate } = require('gatsby')

const InternalProvider = require('./context/InternalProvider').default

module.exports = ({ element }) => {
	if (typeof window !== `undefined`) {
		window.addEventListener('popstate', function(event) {
			// prevent the back button during transitions as it breaks pages
			if (window.__tl_inTransition) {
				window.__tl_back_button_pressed = true
				navigate(window.__tl_desiredPathname)
			}
		})
	}

	return <InternalProvider>{element}</InternalProvider>
}
