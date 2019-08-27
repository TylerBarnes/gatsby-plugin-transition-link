import React, { PureComponent, cloneElement } from "react";
import { setTimeout, clearTimeout } from "requestanimationframe-timer";
import { PublicProvider } from "../context/createTransitionContext";

export default class TransitionRenderer extends PureComponent {
  state = {
    shouldBeVisible: !!!this.props.appearAfter
  };

  componentDidMount = () => {
    const delay = typeof this.props.delay === "number" ? this.props.delay : 0;
    const appearafter =
      typeof this.props.appearAfter === "number" ? this.props.appearAfter : 0;
    const timeout = delay + appearafter;

    this.appearTimeout = setTimeout(
      () => this.setState({ shouldBeVisible: true }),
      timeout
    );
  };

  componentWillUnmount = () => {
    clearTimeout(this.appearTimeout);
  };

  render() {
    const {
      mount,
      entryZindex,
      exitZindex,
      transitionStatus,
      transitionState,
      children
    } = this.props;

    return (
      <div
        className={`tl-wrapper ${
          mount ? "tl-wrapper--mount" : "tl-wrapper--unmount"
        } tl-wrapper-status--${transitionStatus}`}
        style={{
          zIndex: mount ? entryZindex : exitZindex,
          opacity: this.state.shouldBeVisible ? 1 : 0
        }}
      >
        <PublicProvider value={{ ...transitionState }}>
          {children}
        </PublicProvider>
      </div>
    );
  }
}
