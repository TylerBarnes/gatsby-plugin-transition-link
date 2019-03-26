# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.7.2](https://github.com/TylerBarnes/gatsby-plugin-transition-link/compare/v1.7.1...v1.7.2) (2019-03-26)



## [1.7.1](https://github.com/TylerBarnes/gatsby-plugin-transition-link/compare/v1.7.0...v1.7.1) (2019-03-25)



# [1.7.0](https://github.com/TylerBarnes/gatsby-plugin-transition-link/compare/v1.6.2...v1.7.0) (2019-03-25)


### Features

* prevent the back button during transitions ([f879140](https://github.com/TylerBarnes/gatsby-plugin-transition-link/commit/f879140))



## [1.6.2](https://github.com/TylerBarnes/gatsby-plugin-transition-link/compare/v1.6.0...v1.6.2) (2019-03-25)


### Bug Fixes

* make publishing workflow easier & bump version to fix incorrect publish ([b5e3e14](https://github.com/TylerBarnes/gatsby-plugin-transition-link/commit/b5e3e14))



# 1.6.0 (2019-03-25)


### Bug Fixes

* 56: fixed missing scrollingElement in some browsers; ([b3aad7b](https://github.com/TylerBarnes/gatsby-plugin-transition-link/commit/b3aad7b))
* Add missing parenthesis on link ([f19dfc5](https://github.com/TylerBarnes/gatsby-plugin-transition-link/commit/f19dfc5))
* Update example site name for yarn workspaces ([2c58795](https://github.com/TylerBarnes/gatsby-plugin-transition-link/commit/2c58795))


### Features

* added property to configure swipe offset; ([ac95547](https://github.com/TylerBarnes/gatsby-plugin-transition-link/commit/ac95547))



## 1.5.2 (2019-03-14)



## 1.4.4 (2018-12-18)



## 1.4.1 (2018-12-02)



## 1.3.4 (2018-11-24)



## 1.3.1 (2018-11-23)



# 1.3.0 (2018-11-22)



## 1.2.5 (2018-11-21)



## 1.2.3 (2018-11-17)



## 1.2.2 (2018-11-15)



## 1.1.2 (2018-11-12)



## 1.1.1 (2018-11-08)



# 1.1.0 (2018-11-08)



## 1.0.11 (2018-11-07)



## 1.0.10 (2018-11-07)



## 1.0.7 (2018-11-07)



## 1.0.1 (2018-11-04)



# 1.0.0 (2018-11-04)



# 0.1.0 (2018-10-26)



## 1.5.2 (2019-03-14)

Pass onClick handlers through to TransitionLink

Thanks to @lsirivong, onClick handlers get passed through to AniLink and TransitionLink.

## 1.4.4 (2018-12-18)

- Properly reset scroll position when clicking a link with no transition #21
- More accurately calculate when the transition is complete #22

## 1.4.1 (2018-12-02)

- don't pass all props through to gatsby-link, just pass activeStyle and className
- only apply min height to the site wrapper when not in transition to fix some transition glitches for the swipe animation
- prevent the fade transition from jumping the exiting page to the top of the screen
- default fade transition default length is now 800ms instead of 400ms

## 1.3.4 (2018-11-24)

Not all props were being passed through to gatsby link when using AniLink, this fixes that.
This also fixes some inconsistencies in the documentation and the "duration" prop in AniLink.

## 1.3.1 (2018-11-23)

Fix gatsby build error from last release

# 1.3.0 (2018-11-22)

Fix scroll jumping on save during development.

Previously, saving your components or pages would cause the page to jump to the top, meaning you would have to scroll down to the component you were working on over and over. This fixes that.

This should also fix the issue where footers in layout components weren't pushed down by the contents of your page.

## 1.2.5 (2018-11-21)

Improved saved scroll position jumping + small refactor

## 1.2.3 (2018-11-17)

This releases fixes `WebpackError: ReferenceError: GATSBY_LAYOUT_COMPONENT_PATH is not defined`

## 1.2.2 (2018-11-15)

Prior to this release, GSAP needed to be installed for TransitionLink to not throw errors.
Now, the AniLink component is moved to it's own file and will need to be imported as default from "gatsby-plugin-transition-link/AniLink".

It looks like an earlier release also broke layout functionality and that has been fixed with this release.
If you were getting the error

```bash
warning  in ../gatsby-plugin-transition-link/src/components/Layout.js

Critical dependency: the request of a dependency is an expression
```

v1.2.2 fixes this.

## 1.1.2 (2018-11-12)

- Not all page props were being passed to layouts
- Pathname wasn't being passed to the onEnter function which is using it

## 1.1.1 (2018-11-08)

# 1.1.0 (2018-11-08)

## 1.0.11 (2018-11-07)

## 1.0.10 (2018-11-07)

## 1.0.7 (2018-11-07)

## 1.0.1 (2018-11-04)

# 1.0.0 (2018-11-04)

# 0.1.0 (2018-10-26)
