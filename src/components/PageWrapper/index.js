import React, { Component } from "react";
import { PublicProvider } from "../../context/createTransitionContext";

import "./style.css";

class PageWrapper extends Component {
  shouldComponentUpdate(previousProps) {
    return previousProps.transitionStatus !== this.props.transitionStatus;
  }

  render() {
    const {
      children,
      transitionState,
      transitionStatus,
      exitProps,
      entryProps,
      forwardedRef
    } = this.props;

    const mount =
      transitionStatus === "entering" || transitionStatus === "entered";

    const exitZindex = exitProps.zIndex || 0;
    const entryZindex = entryProps.zIndex || 1;

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
          {children}
        </PublicProvider>
      </div>
    );
  }
}

export { PageWrapper };
