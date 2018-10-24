import React, { Component } from 'react'
import { Link } from 'gatsby'
import { TimelineMax } from 'gsap'
// import GSAP from 'react-gsap-enhancer'

import TransitionLink from '../../plugins/gatsby-plugin-transition-link'
import Layout from '../components/layout'

class Index extends Component {
  constructor(props) {
    super(props)

    this.startAnimation = this.startAnimation.bind(this)
    this.moveAnimation = this.moveAnimation.bind(this)

    this.layoutContents = React.createRef()
    this.transitionCover = React.createRef()
  }

  moveAnimation = ({ options }) => {
    const totalTime = options.timeout / 1000

    return new TimelineMax()
      .to(this.transitionCover, totalTime / 2, { y: '0%' })
      .set(this.layoutContents, { opacity: 0 })
      .to(this.transitionCover, totalTime / 2, { y: '-100%' })

    // return new TimelineMax()
    //   .to(target.find({ name: 'transitionCover' }), totalTime / 2, { y: '0%' })
    //   .set(target.find({ name: 'layoutContents' }), { opacity: 0 })
    //   .to(target.find({ name: 'transitionCover' }), totalTime / 2, { y: '-100%' })
  }

  startAnimation = timeout => {
    console.log('starting animation')

    // this.addAnimation(moveAnimation, { timeout })
    this.moveAnimation({ options: { timeout } })

    setTimeout(() => {
      console.log(`Animation finished after ${timeout}ms`)
    }, timeout)
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
            nextState={{ animation: 'fromHome' }}
          >
            Go to page 2 that way{' '}
            <span aria-label="pointing down" role="img">
              👇
            </span>
          </TransitionLink>
          {/* <br />
        <TransitionLink
          to="/page-2"
          exitAnimationTimeout={1200}
          hideNextFor={500}
          triggerFn={this.startAnimation}
          nextState={{
            animation: 'fromHome',
            headerBgColor: 'yellow'
          }}
        >
          Go to page 2 that way{' '}
          <span aria-label="pointing down" role="img">
            👇
          </span>
          but make the header yellow when we get there
        </TransitionLink>
        <br />
        <TransitionLink
          to="/page-2"
          exitAnimationTimeout={2000}
          hideNextFor={1000}
          triggerFn={this.startAnimation}
          nextState={{
            animation: 'fromHomeFirey',
          }}
        >
          Go to page 2 with a{' '}
          <span aria-label="fire" role="img">
            🔥
          </span>
          y transition
        </TransitionLink> */}
        </section>
        <div
          ref={r => (this.transitionCover = r)}
          style={{
            position: 'fixed',
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
// export default GSAP()(Index)
