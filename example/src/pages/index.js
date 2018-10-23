import React, { Component } from 'react'
import { Link } from 'gatsby'
import GSAP from 'react-gsap-enhancer'
import { TweenMax, TimelineMax } from 'gsap/TweenMax'

import TransitionLink from '../../plugins/gatsby-plugin-transition-link'
import Layout from '../components/layout'

const moveAnimation = ({ target, options }) => {
  const totalTime = options.timeout / 1000;
  
  return new TimelineMax()
  .to(target.find({type: 'transitionCover'}), totalTime / 2, { y: "0%" })
  .set(target.find({name:"layoutContents"}), {opacity: 0})
    .to(target.find({type: 'transitionCover'}), totalTime / 2, {y: "-100%"})
}
class index extends Component {
  constructor(props) {
    super(props)

    this.startAnimation = this.startAnimation.bind(this)
  }

  startAnimation = timeout => {
    console.log('starting animation')

    this.addAnimation(moveAnimation, { timeout })

    setTimeout(() => {
      console.log(`Animation finished after ${timeout}ms`)
    }, timeout)
  }

  render() {
    return (
      <Layout>
        <section name="layoutContents">
          <h1>Hi people</h1>
        <p>Check out these sick transitions.</p>

        <Link to="/page-2">Go to page 2 normally</Link>
        <br />
        <TransitionLink
          to="/page-2"
          exitAnimationTimeout={1000}
          hideNextFor={600}
          triggerFn={this.startAnimation}
          nextState={{
            animation: 'fromHome',
          }}
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
        <div type="transitionCover" style={{ position: "fixed", background: "rebeccapurple", top: 0, left: 0, width: "100vw", height: "100vh", transform: "translateY(100%)"}} />
      </Layout>
    )
  }
}

export default GSAP()(index)
