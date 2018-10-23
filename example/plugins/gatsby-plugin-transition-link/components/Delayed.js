import React from 'react'
import PropTypes from 'prop-types'

class Delayed extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hidden: true }
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ hidden: false })
      console.log(`Next page mounted`)
    }, this.props.wait)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    // console.log(this.state.hidden)
    return this.state.hidden ? '' : this.props.children
  }
}

Delayed.propTypes = {
  wait: PropTypes.number.isRequired,
}

export default Delayed
