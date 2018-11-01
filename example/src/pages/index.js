import React, { Component } from 'react'
import { TweenMax, TimelineMax, Power1 } from 'gsap'
import GSAP from 'react-gsap-enhancer'

import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'
import Layout from '../components/layout'
import DisplayState from '../components/DisplayState'

function moveAnimation(utils) {
  return TweenMax.from(utils.target, 1, { x: '-=123' })
}

class Index extends Component {
  constructor(props) {
    super(props)

    this.verticalAnimation = this.verticalAnimation.bind(this)

    this.layoutContents = React.createRef()
    this.transitionCover = React.createRef()
  }

  verticalAnimation = ({ length }, direction) => {
    const directionTo = direction === 'up' ? '-100%' : '100%'
    const directionFrom = direction === 'up' ? '100%' : '-100%'

    // convert ms to s for gsap
    const seconds = length / 1000

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

  test(exit, node) {
    // console.log(exit, node.querySelectorAll('h1'))
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
      <Layout>
        <section ref={n => (this.layoutContents = n)}>
          <h1 onClick={() => this.addAnimation(moveAnimation)}>Hi people</h1>
          <p>Check out these sick transitions.</p>

          <TransitionLink to="/page-2">Go to page 2 normally</TransitionLink>
          <br />
          <TransitionLink
            to="/page-2"
            exit={{
              length: 1000,
              trigger: exit => this.verticalAnimation(exit, 'down'),
              state: { test: 'exit state' },
            }}
            entry={{
              delay: 500,
              trigger: (entry, node) => this.test(entry, node),
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
              length: 1200,
              trigger: exit => this.verticalAnimation(exit, 'up'),
            }}
            entry={{ delay: 500, length: 1000, state: { layoutTheme: 'dark' } }}
          >
            Go to page 2 that way{' '}
            <span aria-label="pointing up" role="img">
              ☝️
            </span>
            and give us a dark theme when we get there.
          </TransitionLink>
          <br />
          {/* <TransitionLink
            to="/page-2"
            exit={{
              delay: 3000,
              length: 3000,
              trigger: () => console.log('so triggered by this exit'),
              state: { it: 'is happening' },
            }}
            entry={{
              delay: 1000,
              length: 4000,
              trigger: () => console.log('and VERY triggered by this entry'),
              state: { have: 'this' },
            }}
          >
            slow delayed exit with overlap example. check your console.
          </TransitionLink> */}

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

export default GSAP()(Index)
