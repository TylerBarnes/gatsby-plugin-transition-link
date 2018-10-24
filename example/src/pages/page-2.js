import React from 'react'
import { Link } from 'gatsby'
// import TransitionLink from '../../plugins/gatsby-plugin-transition-link'

import Layout from '../components/layout'

const SecondPage = ({ location: { state } }) => (
  <Layout theme={state ? state.layoutTheme : null}>
    <h1>
      Hi from the second page{' '}
      {state && state.layoutTheme === 'dark' ? `(dark theme)` : null}
    </h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go home normally</Link>
    {/* <br />
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
    </TransitionLink> */}
  </Layout>
)

export default SecondPage
