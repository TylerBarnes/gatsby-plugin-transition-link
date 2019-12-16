module.exports = {
	presets: [
		[
			'babel-preset-gatsby-package',
			{
				browser: true,
			},
		],
	],
	plugins: ['@babel/plugin-proposal-class-properties'],
}
