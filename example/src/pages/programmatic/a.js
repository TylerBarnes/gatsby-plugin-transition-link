import React from 'react'
import { useTriggerTransition } from 'gatsby-plugin-transition-link'
import Layout from '../../components/layout'
import { fade } from '../../components/programmatic'

const A = () => {
  const triggerTransition = useTriggerTransition({
    to: '/programmatic/b',
    exit: {
      length: 1,
      trigger: ({ exit, node }) => fade({ exit, node, direction: 'out' }),
    },
    entry: {
      length: 0.5,
      delay: 0.5,
      trigger: ({ exit, node }) => fade({ exit, node, direction: 'in' }),
    },
  })
  return (
    <Layout>
      <h1>Hello programmatic people</h1>
      <a href="/programmatic/b" onClick={triggerTransition}>
        Go to page B programmatically onClick
      </a>
    </Layout>
  )
}

export default A
