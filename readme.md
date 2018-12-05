![alt text](https://raw.githubusercontent.com/TylerBarnes/gatsby-plugin-transition-link/master/images/gatsby-plugin-transition-link.png "Gatsby Plugin Transition Link logo")

# Gatsby Plugin Transition Link

TransitionLink provides a simple api for describing expressive transitions between pages in [Gatsbyjs](https://www.gatsbyjs.org/). Page links are used to determine which transition should fire, making page transitions flexible and easy to use.

TransitionLink is compatible with declarative react animation libraries like [react-pose](https://popmotion.io/pose/) and [react-spring](https://react-spring.surge.sh/). It's also compatible with imperative animation libraries like [gsap](https://greensock.com) and [anime.js](http://animejs.com/)

## Sites that use TransitionLink

- [Demo site](https://gatsby-plugin-transition-link.netlify.com/)
- [bare.ca](https://bare.ca/)
- [TransitionLink docs](https://transitionlink.tylerbarnes.ca/)
- [Edit this file](https://github.com/TylerBarnes/gatsby-plugin-transition-link/blob/master/readme.md) to add yours

## Features

- Per-Link transitions
- Fine control of page mounting and unmounting timing
- Function or state based transitions with `<TransitionLink />`
- Transition state and status with `<TransitionState />` and in your page & template props
- Display animation content above your pages with `<TransitionPortal />`
- Use default transitions with `<AniLink />`

## Usage

For info on using TransitionLink refer to [the docs](https://transitionlink.tylerbarnes.ca/).

## Contributing

1. Clone this repo
2. Run `yarn && yarn watch` from the root directory.
3. In another terminal window `cd` into the lib directory and run `yarn link`.
4. `cd` to the project directory you want to test it out on and run `yarn link gatsby-plugin-transition-link`.
5. copy `.eslintrc.json` to the root of your project.
6. `gatsby develop`

Now when you make changes to the TransitionLink src folder, they will reflect in your project.

Feature requests and PR's are welcome! If you're having a problem please leave an issue and I'll help you out asap.
