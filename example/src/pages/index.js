import React from 'react'
import { Link } from 'gatsby'
import TransitionLink from '../../plugins/gatsby-plugin-transition-link'
import Layout from '../components/layout'

const startAnimation = timeout => {
  console.log('starting animation')

  setTimeout(() => {
    console.log(`Animation finished after ${timeout}ms`)
  }, timeout)
}

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Check out these sick transitions.</p>

    <Link to="/page-2">Go to page 2 normally</Link>
    <br />
    <TransitionLink
      to="/page-2"
      exitAnimationTimeout={4000}
      hideNextFor={2000}
      triggerFn={startAnimation}
      nextState={{
        animation: 'fromHome',
      }}
    >
      Go to page 2 that way{' '}
      <span aria-label="pointing down" role="img">
        👇
      </span>
    </TransitionLink>
    <br />
    <TransitionLink
      to="/page-2"
      exitAnimationTimeout={2000}
      hideNextFor={1000}
      triggerFn={startAnimation}
      nextState={{
        animation: 'fromHomeFirey',
      }}
    >
      Go to page 2 with a{' '}
      <span aria-label="fire" role="img">
        🔥
      </span>
      y transition
    </TransitionLink>
  </Layout>
)

export default IndexPage
