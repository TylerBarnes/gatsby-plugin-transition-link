**_IMPORTANT:_** This plugin is pre-alpha. V1 is being worked on and there will be breaking changes very soon.

# Gatsby Plugin Transition Link

A plugin for custom page animations in Gatsby.

[Example site](https://gatsby-plugin-transition-link.netlify.com/)

## Installation

`npm i gatsby-plugin-transition-link`

or

`yarn add gatsby-plugin-transition-link`

## Overview / Idea

In the past I thought of page transitions in single instances with each page having it's own entry and exit animation. Because of this I always ended up using a fade transition everywhere due to the complexity of managing multiple animations to and from specific pages. Where would I cleanly describe the transition from page A to page B vs page A to page C?

In trying to figure out an easy way to create and manage these more complex transitions it suddenly hit me: The Link is the link!

Links are already the mediator between pages so it makes sense that they would also describe the transition between them.

TransitionLink provides a simple api for using a link to trigger an animation, delay the current page from unmounting, delay when the next page will display, and send state to the next page to be used in it's own entry animation.

Managing transitions using links means navigating from a home page to a blog post can easily have a different animation than going from the same home page to a contact page.

## Usage

Add `gatsby-plugin-transition-link` to your gatsby config.

```jsx
module.exports = {
    plugins: [
      `gatsby-plugin-transition-link`
    ]
];
```

Use it in your project

```javascript
import TransitionLink from 'gatsby-plugin-transition-link`;
```

```jsx
<TransitionLink
  to="/page-2"
  exitFor={1000}
  exitFn={time => this.verticalAnimation(time, "down")}
  entryIn={600}
  entryState={{ animation: "fromBottom" }}
>
  Go to page 2
</TransitionLink>
```

## Props

### to

Used exactly the same as in gatsby-link.

### exitFor

The time in milliseconds your animation will take to finish. The exiting page will unmount after this.

### exitFn

A function that will be called as soon as the link is clicked. You should use it to trigger your exit animation. It receives a property that returns the value from the `exitFor` prop.
ex:

```jsx
exitFn={time => this.verticalAnimation(time, 'down')}
```

### exitState

Could be used in place of exitFn to change the state of the exiting page instead of triggering a function. Or use them both if you want!

### entryIn

The amount of time to delay displaying the next route.

### entryState

An object that gets passed to the next page, useful for specifying entry animations on the next page or for changing page styles based on which animation or page the user is coming from.

## Transition status

Along with the state you pass to the exiting or entering pages, a property called "status" will be added to the state object with the values of "entered" or "exiting".

```javascript
{
  status: "entered";
}
```

## Accessing transition state

You can use the TransitionConsumer component to access the transition state anywhere.

```jsx
import { TransitionConsumer } from "gatsby-plugin-transition-link";
```

```jsx
<TransitionConsumer>{state => console.log(state)}</TransitionConsumer>
```

Your pages and templates will also receive three props: transitionStatus, entryState, and exitState.

```jsx
const Page = ({ children, transitionStatus, entryState, exitState }) => (
  <div className={transitionStatus}>{children}</div>
);
```

## Default transitions

I haven't tried it yet but theoretically you could wrap TransitionLink in your own component and use that as a link everywhere.

```jsx
const Link = ({children, to}) => (
  <TransitionLink to={to} exitFor={100} enterIn={150} exitFn={fadeOut} enterState={{animation: fadeIn}}>{children}</TransitionLink>
 )

 <Link to="/page-2">Go to page 2</Link>
```

or you could abstract away various animations.

```jsx
<Link to="/page-2" transition="fade">
  Go to page 2
</Link>

<Link to="/page-3" transition="swipeLeft">
  Go to page 3
</Link>
```

## Considerations

If you use TransitionLink, you shouldn't also use gatsby-link. Currently I haven't set it up so entry and exit states can be reset by gatsby-link. This means your entry or exit animations will keep firing if you mix the normal gatsby-link with TransitionLink.
You can still use TransitionLink the same way you use gatsby-link and you can even import it as Link if you want.

## Installation Conflicts

TransitionLink uses the `wrapPageElement` hook to add the necessary components. If another plugin prevents transitions from working properly by using the same hook, you can wrap TransitionHandler around pages yourself.

```jsx
import { TransitionHandler } from 'gatsby-plugin-transition-link`;

const Layout = ({element, location}) => (
    <TransitionHandler location={props.location}>{element}</TransitionHandler>
)
```

TransitionHandler needs to be outside the page component though, not inside it. If you're using v2 style layouts as components, that's not the place to put TransitionHandler. You can put it in the `wrapPageElement` or `wrapRootElement` hooks. For most projects adding it to gatsby-config.js should work.
