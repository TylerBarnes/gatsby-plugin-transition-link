import React from 'react'
import { Location } from '@reach/router'

function print_r(o) {
  if (typeof window !== undefined) {
    return JSON.stringify(o, null, '\t')
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
  } else {
    return null
  }
}

function DisplayState() {
  return (
    <section style={{ marginTop: '100px' }}>
      <h4>Current location state</h4>
      <Location>
        {({ location: { state } }) => (
          <pre dangerouslySetInnerHTML={{ __html: print_r(state) }} />
        )}
      </Location>
    </section>
  )
}

export default DisplayState
