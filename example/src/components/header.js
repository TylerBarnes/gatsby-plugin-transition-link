import React from 'react'
import { TransitionLink } from 'gatsby-plugin-transition-link'

import GithubLink from './GithubLink'

const Header = ({ siteTitle, locationState }) => {
  const headerColor =
    locationState && locationState.headerBgColor
      ? locationState.headerBgColor
      : 'rebeccapurple'
  return (
    <div
      style={{
        background: headerColor,
        marginBottom: '1.45rem',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem',
          paddingRight: '120px',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <TransitionLink
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </TransitionLink>
        </h1>
      </div>

      <GithubLink />
    </div>
  )
}

export default Header;