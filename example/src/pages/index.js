import React, { Component } from 'react'
import { Link } from 'gatsby'
import { TimelineMax, Power1 } from 'gsap'

import TransitionLink from '../../plugins/gatsby-plugin-transition-link'
import Layout from '../components/layout'

class Index extends Component {
  constructor(props) {
    super(props)

    this.startAnimation = this.startAnimation.bind(this)

    this.layoutContents = React.createRef()
    this.transitionCover = React.createRef()
  }

  startAnimation = timeout => {
    console.log('starting animation')
    setTimeout(() => {
      console.log(`Animation finished after ${timeout}ms`)
    }, timeout)

    const totalTime = timeout / 1000
    console.log(totalTime / 2)

    return new TimelineMax()
      .to(this.transitionCover, totalTime / 2, {
        y: '0%',
        ease: Power1.easeInOut,
      })
      .set(this.layoutContents, { opacity: 0 })
      .to(this.transitionCover, totalTime / 2, {
        y: '-100%',
        ease: Power1.easeIn,
      })
  }

  render() {
    return (
      <Layout>
        <section ref={r => (this.layoutContents = r)}>
          <h1>Hi people</h1>
          <p>Check out these sick transitions.</p>

          <Link to="/page-2">Go to page 2 normally</Link>
          <br />
          <TransitionLink
            to="/page-2"
            exitAnimationTimeout={1000}
            hideNextFor={600}
            triggerFn={this.startAnimation}
            nextState={{ animation: 'fromBottom' }}
          >
            Go to page 2 that way{' '}
            <span aria-label="pointing down" role="img">
              👇
            </span>{' '}
            and animate in the next page
          </TransitionLink>
          <br />
          <TransitionLink
            to="/page-2"
            exitAnimationTimeout={1200}
            hideNextFor={500}
            triggerFn={this.startAnimation}
            nextState={{ animation: 'fromHome', layoutTheme: 'dark' }}
          >
            Go to page 2 that way{' '}
            <span aria-label="pointing down" role="img">
              👇
            </span>
            but give us a dark theme when we get there.
          </TransitionLink>
        </section>
        <div
          ref={r => (this.transitionCover = r)}
          style={{
            position: 'absolute',
            background: 'rebeccapurple',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            transform: 'translateY(100%)',
          }}
        />
      </Layout>
    )
  }
}

export default Index
