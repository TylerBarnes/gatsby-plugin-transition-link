import React from 'react'
import { Link } from 'gatsby'
import TransitionLink from '../../plugins/gatsby-plugin-transition-link'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go home normally</Link>
    <br />
    <TransitionLink
      to="/"
      exitAnimationTimeout={2000}
      hideNextFor={1000}
      triggerFn={() => {}}
      nextState={{
        animation: 'fromRight',
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
      exitAnimationTimeout={2000}
      hideNextFor={1000}
      triggerFn={() => {}}
      nextState={{
        animation: 'fromLeft',
      }}
    >
      Go back to the homepage that way{' '}
      <span aria-label="pointing right" role="img">
        👉
      </span>
    </TransitionLink>
  </Layout>
)

export default SecondPage
