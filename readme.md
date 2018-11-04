![alt text](https://raw.githubusercontent.com/TylerBarnes/gatsby-plugin-transition-link/master/images/gatsby-plugin-transition-link.png "Gatsby Plugin Transition Link logo")

# Gatsby Plugin Transition Link

TransitionLink provides a simple api for describing expressive transitions between pages in [Gatsbyjs](https://www.gatsbyjs.org/).

- trigger functions, access dom nodes, and set delays on page exit & entry using `<TransitionLink />`
- set, access and manipulate page state using `<TransitionState />`
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

## AniLink

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

Override the animation duration in seconds

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

**Available defaults:**

- fade
- swipe
- cover
- paintDrip

## TransitionLink

The real magic is in making your own transitions!

```javascript
import TransitionLink from "gatsby-plugin-transition-link";
```

There is a settings object for both entering and exiting pages.
Following are all the props / settings that are available.

```jsx
<TransitionLink
  to="/page-2"
  exit={{
    trigger: ({ exit, entry, node, e }) =>
      this.verticalAnimation(exit, entry, node, e),
    delay: 0.1,
    length: 1,
    state: { exiting: true }
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

#### All time based props are set in seconds.

#### Delays are stacked.

exit delay starts counting immediately on click and then entry delay starts counting after that.

#### The timeline runs it's course like so:

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

### trigger functions

The exit and entry triggers get access to four pieces of data:

- exit props
- entry props
- node
- e

**exit & entry** are both objects containing the entry and exit props.
The following will log the entry props and then the exit props since both entry and exit triggers have access to each others props.

```jsx
exit={{
  length: 1,
  trigger: ({exit, entry}) => console.log(entry)
  }}
entry={{
  delay: 0.5,
  length: 0.6,
  trigger: ({exit, entry}) => console.log(exit)
  }}
```

**node** is the DOM node of the page related to the trigger that's accessing it. exit and entry do not have access to each others DOM nodes.

this will log the DOM node of the exiting page and then log the node of the entering page:

```jsx
exit={{ trigger: ({node}) => console.log(node) }}
entry={{ trigger: ({node}) => console.log(node) }}
```

**e** is the event passed through from the users mouse click.

```jsx
exit={{ trigger: ({e}) => console.log(e) }}
```

### A note on DOM nodes vs refs

In react it's recommended to use refs to access DOM elements. Unfortunately there isn't a simple way to set refs on a component or multiple matching components from another component without a bunch of work. If you want to do things the React way you can use exit and entry states to do animation. I found this quite laborious and ended up resorting to using the DOM instead.

For example, if I want to fade in all the headings on the next page in a staggered animation I would just write `node.querySelectorAll("h1,h2,h3,h4")` in my entry trigger function to access those elements and then easily animate them.
Doing this with refs would require setting a ref on each of those elements manually. You would then need to pass state to your entering page, have the page listen for your state and start an animation based on that state. This isn't very portable as you would then need to manually add this to every page that you want to use the transition on.

I recommend using gsap to manipulate the DOM directly. This is going to be the most flexible and powerful and the least amount of work. gsap is very performant and is an industry standard outside of react because it's so fast and excellent. If you want, you can still use refs with gsap!

## TransitionPortal

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

## TransitionState

You can use the TransitionState component to access the transition state anywhere.

```jsx
import { TransitionState } from "gatsby-plugin-transition-link";
```

```jsx
<TransitionState>{state => console.log(state)}</TransitionState>
```

Your pages and templates will also receive three props: transitionStatus, entryState, and exitState.

```jsx
const Page = ({ children, transitionStatus, entryState, exitState }) => (
  <div className={transitionStatus}>{children}</div>
);
```

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
