![alt text](https://raw.githubusercontent.com/TylerBarnes/gatsby-plugin-transition-link/master/images/gatsby-plugin-transition-link.png "Gatsby Plugin Transition Link logo")

# Gatsby Plugin Transition Link

TransitionLink provides a simple api for describing expressive transitions between pages in [Gatsbyjs](https://www.gatsbyjs.org/).

- trigger functions, access dom nodes, set state, and set delays on page exit & entry using `<TransitionLink />`
- Access transition state and status using `<TransitionState />` or directly from your page/template props
- display animation content above your site with `<TransitionPortal />`
- use default transitions with `<AniLink />`
  - Fade
  - Swipe
  - Cover
  - PaintDrip

[Check out some examples.](https://gatsby-plugin-transition-link.netlify.com/)

## Installation

```bash
yarn add gatsby-plugin-transition-link
# or
npm i gatsby-plugin-transition-link
```

Add the plugin to your gatsby config.

```jsx
module.exports = {
    plugins: [
      `gatsby-plugin-transition-link`
    ]
];
```

## Default transitions with the AniLink component

The real magic is in making your own custom animations with TransitionLink but you can get started easily with default transitions using AniLink.

Install [gsap](https://greensock.com/)

```bash
yarn add gsap
# or
npm i gsap
```

```javascript
import { AniLink } from "gatsby-plugin-transition-link";
```

Add a transition name as a blank prop

```jsx
<AniLink fade to="page-4">
  Go to Page 4
</AniLink>
```

If you'd like, override the animation duration in seconds

```jsx
<AniLink paintDrip to="page-3" duration={1}>
  Go to Page 3
</AniLink>
```

For directional transitions use left, right, up, or down.

```jsx
<AniLink swipe direction="up" to="page-4">
  Go to Page 4
</AniLink>
```

To set the colour of the overlay with PaintDrip, use either the hex or color props. `hex` takes a hex colour value and `color` takes a colour keyword such as black.


```jsx
<AniLink paintDrip to="page-3" color="rebeccapurple">
  Go to Page 3
</AniLink>
<AniLink paintDrip to="page-3" hex="#663399">
  Go to Page 3
</AniLink>
```

To set the background of the overlay in the Cover transition, use the `bg` prop. bg forwards through an assignment for the css background property. This allows you to set a colour or use a background image if you'd like.


```jsx
<AniLink cover to="page-3" bg="#663399">
  Go to Page 3
</AniLink>
```


**Available defaults:**

- fade
- swipe
- cover
- paintDrip

[Check out the default transitions here](http://gatsby-plugin-transition-link.netlify.com)

## The TransitionLink component

The real magic is in making your own transitions with TransitionLink!

```javascript
import TransitionLink from "gatsby-plugin-transition-link";
```

There are props for controlling the exiting page `exit={{}}` and props for controlling the entering page `entry={{}}`.

Each can optionally take a delay, length, transition state, and a trigger function. 
Below is an example of the defaults.

```jsx
exit={{
  trigger: () => {},
  delay: 0,
  length: 0,
  state: {},
  zIndex: 0 || 1
}}
entry={{
  trigger: () => {},
  delay: 0,
  length: 0,
  state: {},
  zIndex: 0 || 1
}}
```
Below is an example of TransitionLink in use. Note that all time values are in seconds, not milliseconds.
```jsx
<TransitionLink
  to="/page-2"
  exit={{
    trigger: ({ exit, node }) =>
      this.verticalAnimation(exit, node),
    length: 1,
    zIndex: 2
  }}
  entry={{
    delay: 0.6,
    length: 1,
    state: { theme: "dark" }
  }}
>
  Go to page 2
</TransitionLink>
```

__Note__: the entering page will always be assigned a z-index of 1 while the exiting page will get 0. You can override this yourself if you want your exiting page to sit on top.

### The two main ways to use the TransitionLink component

- Trigger function transitions
- State transitions

#### Trigger functions

The exit and entry trigger functions are fired after each pages delay timer finished.
Each have access to one argument which is an object containing the following data ready to be destructured:

- exit
- entry
- node
- e

**exit & entry** are both objects containing the full entry and exit props.
The following will log the entry props and then after 0.5s the exit props will be logged. Both entry and exit triggers have access to the exit and entry props.

```jsx
exit={{
  length: 1,
  trigger: ({exit, entry}) => console.log(entry, "these are the entry props logged from the exit trigger")
}}
entry={{
  delay: 0.5,
  trigger: ({exit, entry}) => console.log(exit, "these are the exit props logged from the entry trigger")
}}
```

**node** is the DOM node of the page related to the trigger that's accessing it. exit and entry do not have access to each others DOM nodes.

this will log the DOM node of the exiting page and then log the node of the entering page 1 second later:

```jsx
exit={{ 
  trigger: ({node}) => console.log(node, "this is the exiting page's DOM node") 
}}
entry={{ 
  delay: 1, 
  trigger: ({node}) => console.log(node, "this is the entering page's DOM node") 
}}
```

**e** is the event passed through from the users mouse click.

```jsx
exit={{ 
  trigger: ({e}) => console.log(e) 
}}
entry={{ 
  trigger: ({e}) => console.log(e) 
}}
```

If you dont need to pass any more arguments to your trigger functions, you can pass them in with no arguments and all of the built in arguments will be passed through.

```jsx
exit={{ 
  trigger: this.exitAnimation
}}

...

exitAnimation = ({exit, entry, node, e}) => {
  // Do something awesome here!
}
```

#### A note on DOM nodes vs refs

In react it's recommended to use refs to access DOM elements. I found using refs problematic since there isn't a simple way to set refs on a component or multiple matching components from another component without a bunch of work. If you want to do things the React way you can still use refs or you can use exit and entry states. I found this quite laborious and ended up resorting to using the DOM nodes instead and I haven't experienced any performance issues.

For example, if we want to fade in all the headings on the next page in a staggered animation we would just write `node.querySelectorAll("h1,h2,h3,h4")` in our entry trigger function. This would allow us to access all headings in the entering page. We could then easily animate them.
Doing this with refs would require setting a ref on each of those elements manually. We would then need to pass state to our entering page, have the page listen for our state and the start an animation based on that state when it changes. This isn't very portable as we would then need to manually add this to every page that we want to use our transition on. Doing things functionally using the DOM nodes allows us to add our transition link to any page or template!

I recommend using [gsap](https://greensock.com/) to manipulate the DOM directly. This is going to be the most flexible and powerful and the least amount of work. gsap is very performant and is an industry standard outside of react because it's so fast and excellent. If you want, you can still use refs with gsap!

### State transitions

State transitions can be used to animate pieces of your page based on which transition status it's in or based on some state you pass from TransitionLink

#### The TransitionState component

You can use the TransitionState component to access transition state that was passed from TransitionLink anywhere in your pages.

```jsx
import { TransitionState } from "gatsby-plugin-transition-link";
```

```jsx
<TransitionState>{state => console.log(state)}</TransitionState>
```

In addition to exposing the exit and entry state, TransitionState also exposes the current transition status of the page the component is a child of.

The transition statuses are:
- Entering
- Entered
- Exiting
- Exited

### Accessing state and status from pages / templates
Your pages and templates will receive three props: 
- transitionStatus
- entryState
- exitState

```jsx
const PageOrTemplate = ({ children, transitionStatus, entryState, exitState }) => (
  <div className={transitionStatus}>{children}</div>
);
```

## The TransitionPortal component

If you have some animation elements which need to sit ontop of both pages, you can use TransitionPortal which is a standard React portal. 

```jsx
import { TransitionPortal } from "gatsby-plugin-transition-link";
```

```jsx
<TransitionPortal>
  <SomeAnimationComponent>
    This component will sit on top of both pages.
  </SomeAnimationComponent>
</TransitionPortal>
```

If you need more control over the z-index of your portal you can assign it one of three levels: bottom, middle, or top. These have z-index values of 1000, 1100, and 1200 respectively. The default level is middle.

```jsx
<TransitionPortal>
  <SomeAnimationComponent>
    This component will sit on top of both pages.
  </SomeAnimationComponent>
</TransitionPortal>
<TransitionPortal level="top">
  <SomeOtherAnimationComponent>
    This component will sit on top of both pages and the other portal.
  </SomeAnimationComponent>
</TransitionPortal>
```

## The TransitionLink timeline of events

On click, the exit timer begins and everything else waits until it finished, then the entry delay timer and exit length timers start at the same time. Once the exit length timer is finished the exiting page unmounts. Once the entry delay timer is up the entry length timer starts. It is possible to overlap all timers of the entering and exit pages except for the exit delay timer which always runs on it's own before everything else.

- on click the exit delay timer starts
- then the exit function is triggered and the exit length timer starts
- at the same time as the exit function, the entry delay timer starts
- after the exit length timer is up, the exiting page unmounts
- after the entry delay timer is up, the entry function is triggered, entry state is injected into the page, and the entry length timer starts
- once all timers are finished, global entry and exit delays and lengths are reset to 0.
- Exit state is reset once the exiting page has unmounted
- Entry state will remain until the user leaves the page

Here's a very primitive diagram!

![alt text](https://raw.githubusercontent.com/TylerBarnes/gatsby-plugin-transition-link/master/images/gatsby-plugin-transition-link-timeline.png "Gatsby Plugin Transition Link animation timeline")

## Conflicts

TransitionLink uses the `wrapPageElement` hook to add the necessary components. If another plugin prevents transitions from working properly by using the same hook, you can wrap TransitionHandler around pages yourself. This may be a problem when using `gatsby-plugin-layout` and can be solved like so:

Wrap TransitionHandler directly around the page element.

```jsx
import { TransitionHandler } from "gatsby-plugin-transition-link";

const Layout = ({ element, location }) => (
  <LayoutRelatedComponents>
    <Menu />
    <TransitionHandler location={props.location}>{element}</TransitionHandler>
  </LayoutRelatedComponents>
);
```

TransitionHandler needs to be outside the page component though, not inside it. If you're using v2 style layouts as components, that's not the place to put TransitionHandler. You can put it in the `wrapPageElement` or `wrapRootElement` hooks. For most projects adding it to gatsby-config.js should work.

## Peace and Love!

🌎🌏✌️❤️🐄

Please let me know what you think. Feature requests and PR's are welcome!
