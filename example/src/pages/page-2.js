import React, { Component } from 'react'
import { Link } from 'gatsby'
import TransitionLink from '../../plugins/gatsby-plugin-transition-link'

import Layout from '../components/layout'
import { TimelineMax, Power1 } from 'gsap'

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
      location: { state = null },
      location,
    } = this.props

    const animation =
      location && state && state.animation ? state.animation : false

    return animation === 'fromBottom'
      ? new TimelineMax().fromTo(
          this.layoutContents,
          2,
          { y: '50%' },
          { y: '0%' }
        )
      : null
  }

  exitHorizontal = (timeout, direction) => {
    const totalTime = timeout / 1000

    const directionTo = direction === 'left' ? '-100%' : '100%'
    const directionFrom = direction === 'left' ? '100%' : '-100%'

    return new TimelineMax()
      .set(this.transitionCover, { x: directionFrom, display: 'block' })
      .to(this.transitionCover, totalTime / 2, {
        x: '0%',
        ease: Power1.easeInOut,
      })
      .set(this.layoutWrapper, { opacity: 0 })
      .to(this.transitionCover, totalTime / 2, {
        x: directionTo,
        ease: Power1.easeInOut,
      })
  }

  render() {
    const {
      location: { state },
    } = this.props

    return (
      <>
        <section ref={n => (this.layoutWrapper = n)}>
          <Layout theme={state && state.layoutTheme ? state.layoutTheme : null}>
            <div ref={n => (this.layoutContents = n)}>
              <h1>
                Hi from the second page{' '}
                {state && state.layoutTheme === 'dark' ? `(dark state)` : null}
              </h1>
              <p>Welcome to page 2</p>
              <Link to="/">Go home normally</Link>

              <br />
              <TransitionLink
                to="/"
                exitFor={2000}
                exitFn={timeout => this.exitHorizontal(timeout, 'left')}
                enterIn={1000}
                enterState={{ animation: 'fromRight' }}
              >
                Go back to the homepage that way{' '}
                <span aria-label="pointing left" role="img">
                  👈
                </span>
              </TransitionLink>
              <br />
              <TransitionLink
                to="/"
                exitFor={2000}
                enterIn={1000}
                exitFn={timeout => this.exitHorizontal(timeout, 'right')}
                enterState={{ animation: 'fromLeft' }}
              >
                Go back to the homepage that way{' '}
                <span aria-label="pointing right" role="img">
                  👉
                </span>
              </TransitionLink>
            </div>
          </Layout>
        </section>
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
      </>
    )
  }
}
