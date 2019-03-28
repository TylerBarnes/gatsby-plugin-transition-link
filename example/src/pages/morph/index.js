import React from 'react'
import styled from 'styled-components'
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
      <SmallBox id="js-small-box" />
    </AniLink>
  </Layout>
)

const SmallBox = styled.div`
  background: red;
  width: 100px;
  height: 100px;
`

export default MorphPage
