import React from 'react'
import Link from 'gatsby-plugin-transition-link'

import { GithubLink } from './GithubLink'

export const Header = ({ siteTitle, locationState }) => {
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
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>

      <GithubLink />
    </div>
  )
}
