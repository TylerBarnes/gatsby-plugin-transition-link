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
        shouldRender: !!!this.props.delay,
        shouldBeVisible: !!!this.props.appearAfter
      };
    }

    componentDidMount() {
      this.renderTimeout = setTimeout(
        () => this.setState({ shouldRender: true }),
        this.props.delay
      );

      this.appearTimeout = setTimeout(
        () => this.setState({ shouldBeVisible: true }),
        this.props.delay + this.props.appearAfter
      );
    }

    componentWillUnmount() {
      clearTimeout(this.renderTimeout);
      clearTimeout(this.appearTimeout);
    }

    render() {
      return this.state.shouldRender || typeof window === `undefined` ? (
        <span
          style={{
            opacity: this.state.shouldBeVisible ? 1 : 0
          }}
        >
          <WrappedComponent {...this.props} />
        </span>
      ) : null;
    }
  }

  return DelayedTransitionWrapper;
}
