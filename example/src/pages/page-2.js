import React, { Component } from 'react'
import { TransitionLink, TransitionPortal, Swipe, Cover } from 'gatsby-plugin-transition-link'
import Layout from '../components/layout'
import { TimelineMax, Power1 } from 'gsap'

import DisplayState from '../components/DisplayState'

export default class SecondPage extends Component {
  constructor(props) {
    super(props)

    this.layoutContents = React.createRef()
    this.layoutWrapper = React.createRef()
    this.transitionCover = React.createRef()

    this.exitHorizontal = this.exitHorizontal.bind(this)
  }

  componentDidMount() {
    const {
      entry: { state },
    } = this.props

    return state.animation === 'fromBottom'
      ? new TimelineMax().fromTo(
          this.layoutContents,
          1,
          { y: '10%' },
          { y: '0%' }
        )
      : null
  }

  exitHorizontal = ({ length }, direction) => {
    const seconds = length

    const directionTo = direction === 'left' ? '-100%' : '100%'
    const directionFrom = direction === 'left' ? '100%' : '-100%'

    return new TimelineMax()
      .set(this.transitionCover, { x: directionFrom, display: 'block' })
      .to(this.transitionCover, seconds / 2, {
        x: '0%',
        ease: Power1.easeInOut,
      })
      .set(this.layoutWrapper, { opacity: 0 })
      .to(this.transitionCover, seconds / 2, {
        x: directionTo,
        ease: Power1.easeInOut,
      })
  }

  message = message => {
    console.log(message)
  }

  render() {
    const {
      entry: { state: entryState },
    } = this.props

    return (
      <>
        <section ref={n => (this.layoutWrapper = n)}>
          <Layout
            theme={
              entryState && entryState.layoutTheme
                ? entryState.layoutTheme
                : 'white'
            }
          >
            <div ref={n => (this.layoutContents = n)}>
              <h1>
                Hi from the second page{' '}
                {entryState && entryState.layoutTheme === 'dark'
                  ? `(dark state)`
                  : null}
              </h1>
              <p>There are only 2 pages here but there are 4 transitions!</p>
              <TransitionLink to="/">Go home normally</TransitionLink>
              <br />
              <Cover to="/" direction="left">
                Go home with a cover left
              </Cover>
              <br />
              <Swipe to="/">Go home with a swipe default</Swipe>
              <br />
              <Swipe to="/" direction="right" top="entry">
                Go home with a swipe right
              </Swipe>
              <br />
              <Swipe to="/" direction="left" top="entry">
                Go home with a swipe left
              </Swipe>
              <br />
              <Swipe to="/" direction="up" top="entry">
                Go home with a swipe up
              </Swipe>
              <br />
              <Swipe to="/" direction="down" top="entry">
                Go home with a swipe down
              </Swipe>
              <br />
              <TransitionLink
                to="/"
                exit={{
                  length: 2,
                  trigger: ({ exit }) => this.exitHorizontal(exit, 'left'),
                }}
                entry={{
                  delay: 1,
                  state: { pass: 'Whatever you want', to: 'the next page' },
                }}
              >
                Go back to the homepage that way{' '}
                <span aria-label="pointing left" role="img">
                  👈
                </span>
              </TransitionLink>
              <br />
              <TransitionLink
                to="/"
                exit={{
                  length: 2,
                  trigger: ({ exit }) => this.exitHorizontal(exit, 'right'),
                }}
                entry={{
                  delay: 1,
                  state: { pass: 'Whatever you want', to: 'the next page' },
                }}
              >
                Go back to the homepage that way{' '}
                <span aria-label="pointing right" role="img">
                  👉
                </span>
              </TransitionLink>
              <DisplayState />
              <section
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                  flexDirection: 'column',
                }}
              >
                <h1>
                  This is a tall section to show what transitions look like when
                  you're scrolled
                </h1>
                <TransitionLink
                  to="/"
                  exit={{
                    length: 2,
                    trigger: ({ exit }) => this.exitHorizontal(exit, 'right'),
                  }}
                  entry={{
                    delay: 1,
                    state: { pass: 'Whatever you want', to: 'the next page' },
                  }}
                >
                  Go back to the homepage that way{' '}
                  <span aria-label="pointing right" role="img">
                    👉
                  </span>
                </TransitionLink>
              </section>
            </div>
          </Layout>
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
              display: 'none',
            }}
          />
        </TransitionPortal>
      </>
    )
  }
}
