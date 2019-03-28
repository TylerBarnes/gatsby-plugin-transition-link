import React from 'react'

import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Layout from '../../components/layout'

export default () => (
  <Layout>
    <AniLink
      to="/morph"
      duration={2}
      morph={{
        from: '#js-big-box',
        to: '#js-small-box',
      }}
    >
      <div
        id="js-big-box"
        style={{
          background: 'red',
          width: '100%',
          height: '500px',
        }}
      />
    </AniLink>
  </Layout>
)
