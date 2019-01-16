import React from 'react'
import Layout from '../../components/layout'
import { MySpring, SpringLink } from '../../components/react-spring-animation'

const B = () => (
  <Layout>
    <h1>React spring</h1>
    <MySpring text="hello from page B" />
    <SpringLink to="/react-spring/a">to page a!</SpringLink>
  </Layout>
)

export default B
