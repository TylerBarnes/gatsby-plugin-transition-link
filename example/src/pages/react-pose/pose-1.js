import React from 'react'
import { Layout } from '../../components/layout'
import { Example } from '../../components/Poses/ExamplePose'

export default class PoseOne extends React.Component {
  render() {
    return (
      <Layout theme="white">
        <h1>React pose</h1>
        <Example to="/react-pose/pose-2" />
      </Layout>
    )
  }
}
