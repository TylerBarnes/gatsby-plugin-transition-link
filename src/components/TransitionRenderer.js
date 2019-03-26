import React, { Component, cloneElement } from "react";
import { PublicProvider } from "../context/createTransitionContext";

export default class TransitionRenderer extends Component {
  shouldComponentUpdate(nextProps) {
    // only rerender if the transition status changes.
    return this.props.transitionStatus !== nextProps.transitionStatus;
  }

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
          zIndex: mount ? entryZindex : exitZindex
        }}
      >
        <PublicProvider value={{ ...transitionState }}>
          {/* pass transition state to page/template */}
          {cloneElement(children, {
            ...transitionState
          })}
        </PublicProvider>
      </div>
    );
  }
}
