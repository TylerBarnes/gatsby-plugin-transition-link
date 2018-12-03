import React from 'react'
import { TransitionState } from 'gatsby-plugin-transition-link'

function print_r(o) {
  if (typeof window === `undefined`) return

  return JSON.stringify(o, null, '\t')
    .replace(/\n/g, '<br>')
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
}

function DisplayState() {
  return (
    <TransitionState>
      {context =>
        context ? (
          <section style={{ marginTop: '100px' }}>
            <h4>Current transition state</h4>

            <pre dangerouslySetInnerHTML={{ __html: print_r(context) }} />
          </section>
        ) : null
      }
    </TransitionState>
  )
}

export default DisplayState;