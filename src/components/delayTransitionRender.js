import React, { Component } from "react";

export default function delayTransitionRender(WrappedComponent) {
  class DelayedTransitionWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        shouldRender: false
      };
    }

    componentDidMount() {
      setTimeout(() => this.setState({ shouldRender: true }), this.props.defer);
    }

    render() {
      return this.state.shouldRender ? (
        <WrappedComponent {...this.props} />
      ) : null;
    }
  }

  return DelayedTransitionWrapper;
}
