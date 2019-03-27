import React, { Component } from "react";
import { setTimeout } from "requestanimationframe-timer";

export default function delayTransitionRender(WrappedComponent) {
  class DelayedTransitionWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        // if there is a delay, set shouldRender to false
        // then in componentdid mount shouldRender becomes true
        // after the delay.
        shouldRender: !!!this.props.delay
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
