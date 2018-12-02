import React from 'react'
import { Layout } from '../../components/layout'
import { Example } from '../../components/Poses/ExamplePose'

export default class PoseTwo extends React.Component {
  render() {
    return (
      <Layout theme="white">
        <h1>React pose</h1>
        <Example to="/react-pose/pose-1" bg="black" />
      </Layout>
    )
  }
}
