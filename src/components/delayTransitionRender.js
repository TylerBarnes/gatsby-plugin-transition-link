import React, { Component } from "react";

export function delayTransitionRender(WrappedComponent) {
  class DelayedTransitionWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        shouldRender: false
      };
    }

    componentDidMount() {
      this.timeout = setTimeout(
        () => this.setState({ shouldRender: true }),
        this.props.delay
      );
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    render() {
      return this.state.shouldRender || typeof window === `undefined` ? (
        <WrappedComponent {...this.props} />
      ) : null;
    }
  }

  return DelayedTransitionWrapper;
}
