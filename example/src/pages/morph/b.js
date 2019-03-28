import React from 'react'
import styled from 'styled-components'

import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Layout from '../../components/layout'

export default () => (
  <Layout>
    <AniLink
      morph
      to="/morph"
        from: '#js-big-box',
        to: '#js-small-box',
      }}
    >
      <BigBox id="js-big-box" />
    </AniLink>
  </Layout>
)

const BigBox = styled.div`
  background: red;
  width: 100%;
  height: 500px;
`
