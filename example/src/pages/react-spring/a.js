import React from 'react'
import Layout from '../../components/layout'
import { MySpring, SpringLink } from '../../components/react-spring-animation'

const A = () => (
  <Layout>
    <h1>React spring</h1>
    <MySpring text="hello from page A" />
    <SpringLink to="/react-spring/b">to page b!</SpringLink>
  </Layout>
)

export default A
