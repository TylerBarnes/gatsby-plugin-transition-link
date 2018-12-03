import React, { Component } from 'react'
import Layout from '../../components/layout'
import Example from '../../components/Poses/ExamplePose'

export default class Index extends Component {
  render() {
    return (
      <Layout theme="white">
        <h1>React pose</h1>
        <Example to="/react-pose/pose-1" bg="black" />
      </Layout>
    )
  }
}
