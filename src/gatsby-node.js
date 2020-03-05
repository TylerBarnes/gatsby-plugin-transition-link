const path = require(`path`)

let didRunAlready = false
let absoluteComponentPath

exports.onPreInit = ({ store }, { layout: component }) => {
	if (!component) {
		component = false
	}

	if (didRunAlready) {
		throw new Error(
			`You can only have single instance of gatsby-plugin-transition-link in your gatsby-config.js`
		)
	}

	didRunAlready = true
	absoluteComponentPath = component
}

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
	actions.setWebpackConfig({
		plugins: [
			plugins.define({
				TL__GATSBY_LAYOUT_COMPONENT_PATH: JSON.stringify(
					absoluteComponentPath
				),
			}),
		],
	})
}
