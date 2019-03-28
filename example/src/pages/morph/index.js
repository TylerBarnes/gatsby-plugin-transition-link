import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Layout from '../../components/layout'

const MorphPage = () => (
  <Layout>
    <AniLink
      morph
      to="/morph/b"
      duration={1}
      morph={{
        from: '#js-small-box',
        to: '#js-big-box',
      }}
    >
      <div
        id="js-small-box"
        style={{
          background: 'red',
          width: '100px',
          height: '100px',
        }}
      />
    </AniLink>
  </Layout>
)

export default MorphPage
