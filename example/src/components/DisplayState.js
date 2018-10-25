import React from 'react'
import { Location } from '@reach/router'

function print_r(o) {
  if (typeof window === `undefined`) return

  return JSON.stringify(o, null, '\t')
    .replace(/\n/g, '<br>')
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
}

function DisplayState() {
  return (
    <Location>
      {({ location: { state } }) =>
        state ? (
          <section style={{ marginTop: '100px' }}>
            <h4>Current location state</h4>

            <pre dangerouslySetInnerHTML={{ __html: print_r(state) }} />
          </section>
        ) : null
      }
    </Location>
  )
}

export default DisplayState
