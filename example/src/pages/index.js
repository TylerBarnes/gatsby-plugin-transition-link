import React, { Component } from 'react'
import { TimelineMax, Power1 } from 'gsap'

import {
  TransitionLink,
  TransitionPortal,
  Swipe,
  Cover,
  PaintDrip,
  AniLink,
} from 'gatsby-plugin-transition-link'

import Layout from '../components/layout'
import DisplayState from '../components/DisplayState'

class Index extends Component {
  constructor(props) {
    super(props)

    this.verticalAnimation.bind(this)

    this.layoutContents = React.createRef()
    this.transitionCover = React.createRef()
  }

  verticalAnimation = ({ length }, direction) => {
    const directionTo = direction === 'up' ? '-100%' : '100%'
    const directionFrom = direction === 'up' ? '100%' : '-100%'

    // convert ms to s for gsap
    const seconds = length

    return new TimelineMax()
      .set(this.transitionCover, { y: directionFrom })
      .to(this.transitionCover, seconds / 2, {
        y: '0%',
        ease: Power1.easeInOut,
      })
      .set(this.layoutContents, { opacity: 0 })
      .to(this.transitionCover, seconds / 2, {
        y: directionTo,
        ease: Power1.easeIn,
      })
  }

  test(entry, node) {
    return new TimelineMax().staggerFrom(
      node.querySelectorAll('h2, p, a, pre'),
      1,
      { opacity: 0, y: '+=50' },
      0.1
    )
  }

  message(message) {
    console.log(message)
  }

  render() {
    return (
      <Layout theme="white">
        <section ref={n => (this.layoutContents = n)}>
          <h1>Hi people</h1>
          <p>Check out these sick transitions.</p>
          <AniLink to="/page-2">Go to page 2 normally</AniLink>
          <br />
          <Cover to="/page-2" direction="right">
            Go to page 2 with a cover right
          </Cover>
          <br />
          <Swipe to="/page-2">Go to page 2 with a swipe default</Swipe>
          <br />
          <Swipe to="/page-2" direction="left" top="exit">
            Go to page 2 with a swipe left
          </Swipe>
          <br />
          <Swipe to="/page-2" direction="right" top="exit">
            Go to page 2 with a swipe right
          </Swipe>
          <br />
          <Swipe to="/page-2" direction="up" top="exit">
            Go to page 2 with a swipe up
          </Swipe>
          <br />
          <Swipe to="/page-2" direction="down" top="exit">
            Go to page 2 with a swipe down
          </Swipe>
          <br />
          <PaintDrip to="/page-2" hex="#4b2571">
            Go to page 2 with a paint drip
          </PaintDrip>
          <br />
          <TransitionLink
            to="/page-2"
            exit={{
              length: 1,
              trigger: ({ exit }) => this.verticalAnimation(exit, 'down'),
              state: { test: 'exit state' },
            }}
            entry={{
              delay: 0.5,
              trigger: ({ entry, node }) => this.test(entry, node),
            }}
          >
            Go to page 2 that way{' '}
            <span aria-label="pointing up" role="img">
              👇
            </span>{' '}
            and animate in the next page
          </TransitionLink>
          <br />
          <TransitionLink
            to="/page-2"
            exit={{
              length: 1.2,
              trigger: ({ exit }) => this.verticalAnimation(exit, 'up'),
            }}
            entry={{ delay: 0.5, length: 1, state: { layoutTheme: 'dark' } }}
          >
            Go to page 2 that way{' '}
            <span aria-label="pointing up" role="img">
              ☝️
            </span>
            and give us a dark theme when we get there.
          </TransitionLink>
          <br />
          <DisplayState />
        </section>
        <TransitionPortal>
          <div
            ref={n => (this.transitionCover = n)}
            style={{
              position: 'fixed',
              background: '#4b2571',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              transform: 'translateY(100%)',
            }}
          />
        </TransitionPortal>
      </Layout>
    )
  }
}

export default Index
