import React, { Component } from 'react'
import Layout from '../../components/layout'
import Example from '../../components/Poses/ExamplePose'

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout theme="white">
        <h1>React pose</h1>
        <Example to="/react-pose/pose-1" bg="black" />
      </Layout>
    )
  }
}

export default Index
