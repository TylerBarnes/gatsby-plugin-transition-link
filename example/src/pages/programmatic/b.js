import React, { useRef } from 'react'
import { useTriggerTransition } from 'gatsby-plugin-transition-link'
import Layout from '../../components/layout'
import { fade } from '../../components/programmatic'

const B = () => {
  const triggerTransition = useTriggerTransition({
    exit: {
      length: 1,
      trigger: ({ exit, node }) => fade({ exit, node, direction: "out" }),
    },
    entry: {
      length: 0.5,
      delay: 0.5,
      trigger: ({ exit, node }) => fade({ exit, node, direction: "in" }),
    }});
  const progrToA = () => {
    setTimeout(() => {
      triggerTransition({
        to: '/programmatic/a',
      });
    }, 500);
  }
  return (
    <Layout>
      <h1>Hello programmatic people</h1>
      <a href="/programmatic/a" onMouseEnter={progrToA} onClick={e => e.preventDefault()}>Hover over me and go to page A programmatically in 500ms</a>
    </Layout>
  );
}

export default B
