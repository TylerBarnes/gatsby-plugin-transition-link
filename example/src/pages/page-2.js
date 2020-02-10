import React, { Component } from 'react'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Layout from '../components/layout'
import gsap from 'gsap'

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
      ? gsap.fromTo(
          this.layoutContents,
          { y: '10%' },
          { 
            y: '0%',
            duration: 1,
          }
        )
      : null
  }

  exitHorizontal = ({ length }, direction) => {
    const seconds = length

    const directionTo = direction === 'left' ? '-100%' : '100%'
    const directionFrom = direction === 'left' ? '100%' : '-100%'

    return gsap.timeline()
      .set(this.transitionCover, { x: directionFrom, display: 'block' })
      .to(this.transitionCover, {
        x: '0%',
        ease: "power1.easeInOut",
        duration: seconds / 2,
      })
      .set(this.layoutWrapper, { opacity: 0 })
      .to(this.transitionCover, {
        x: directionTo,
        ease: "power1.easeInOut",
        duration: seconds / 2,
      })
  }

  message = message => {
    console.log(message)
  }

  render() {
    const {
      entry: { state: entryState },
    } = this.props

    console.log(this.props.location.state)

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
              <AniLink fade to="/">
                Fade home
              </AniLink>
              <br />
              <AniLink
                cover
                to="/"
                direction="left"
                duration={3}
                bg="
                  url(https://source.unsplash.com/random)
                  center / cover /* position / size */
                  no-repeat                /* repeat */
                  fixed                    /* attachment */
                  padding-box              /* origin */
                  content-box              /* clip */
                  white                     /* color */
                  "
              >
                Go home with a cover left background image
              </AniLink>
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
              <br />
              <TransitionLink
                to="/"
                onClick={() => console.log('Link clicked')}
              >
                Go home normally (with an `onClick`)
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
                <h1 id="test">
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
